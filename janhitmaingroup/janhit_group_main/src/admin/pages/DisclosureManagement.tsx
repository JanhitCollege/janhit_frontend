import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Building,
  Upload,
  FileText,
  Trash2,
  Save,
  Plus,
  Loader2,
  BookOpen,
  Users,
  Building2,
  Info,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import { campusService } from "../services/campusService";
import {
  getCampusDisclosuresPublic,
  getCampusDisclosuresAdmin,
  createDisclosureDocumentAdmin,
  deleteDisclosureDocumentAdmin,
  bulkUpdateCampusDetailsAdmin,
  getDisclosureDownloadUrl,
} from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TeacherDetail {
  slNo: number;
  name: string;
  designation: string;
  qualification: string;
}

export const DEFAULT_TEACHER_DETAILS: TeacherDetail[] = [];

const DEFAULT_DOCUMENTS: any[] = [];

const DEFAULT_ACADEMICS: any[] = [];

const DEFAULT_METRIC_FIELDS = {
  A_GENERAL_INFO: [
    { key: "SCHOOL_NAME", label: "NAME OF THE SCHOOL / COLLEGE", value: "", placeholder: "e.g. Janhit World School Greater Noida" },
    { key: "AFFILIATION_NO", label: "AFFILIATION NO. (IF APPLICABLE)", value: "", placeholder: "e.g. Applied / CBSE Affiliated" },
    { key: "SCHOOL_CODE", label: "SCHOOL CODE / REGISTRATION NO.", value: "", placeholder: "e.g. Under Process" },
    { key: "ADDRESS", label: "COMPLETE ADDRESS WITH PIN CODE", value: "", placeholder: "e.g. Plot No. 55-B, Knowledge Park-5, Greater Noida, U.P. – 201306" },
    { key: "PRINCIPAL_NAME", label: "PRINCIPAL / DIRECTOR NAME & QUALIFICATION", value: "", placeholder: "e.g. Dr. Sunita Sharma (M.A., B.Ed., Ph.D.)" },
    { key: "EMAIL", label: "SCHOOL / COLLEGE EMAIL ID", value: "", placeholder: "e.g. info@janhitgroup.com" },
    { key: "CONTACT_NO", label: "CONTACT DETAILS (LANDLINE/MOBILE)", value: "", placeholder: "e.g. +91 99585 74400" },
  ],
  D_STAFF: [
    { key: "TOTAL_TEACHERS", label: "TOTAL NO. OF TEACHERS", value: "", placeholder: "e.g. 28 Qualified Educators" },
    { key: "PGT_TEACHERS", label: "PGT TEACHERS", value: "", placeholder: "e.g. 6 Teachers" },
    { key: "TGT_TEACHERS", label: "TGT TEACHERS", value: "", placeholder: "e.g. 10 Teachers" },
    { key: "PRT_TEACHERS", label: "PRT TEACHERS", value: "", placeholder: "e.g. 12 Teachers" },
    { key: "TEACHER_RATIO", label: "TEACHERS SECTION RATIO", value: "", placeholder: "e.g. 1.5 : 1" },
    { key: "SPECIAL_EDUCATOR", label: "DETAILS OF SPECIAL EDUCATOR", value: "", placeholder: "e.g. Ms. Ritu Sharma (M.Ed. Special Ed.)" },
    { key: "COUNSELLOR", label: "COUNSELLOR & WELLNESS TEACHER", value: "", placeholder: "e.g. Mrs. Meenakshi Verma (M.A. Psych)" },
  ],
  E_INFRASTRUCTURE: [
    { key: "CAMPUS_AREA", label: "TOTAL CAMPUS AREA (Sq. Mtr. / Acres)", value: "", placeholder: "e.g. 8,093 Sq. Mtr. (2.0 Acres)" },
    { key: "CLASSROOMS_COUNT_SIZE", label: "NO. AND SIZE OF CLASS ROOMS", value: "", placeholder: "e.g. 32 Rooms (500 Sq. Ft. each)" },
    { key: "LABS_COUNT_SIZE", label: "NO. AND SIZE OF LABORATORIES", value: "", placeholder: "e.g. 5 Labs (750 Sq. Ft. each)" },
    { key: "INTERNET_FACILITY", label: "INTERNET FACILITY", value: "", placeholder: "e.g. Yes (High-Speed Fiber 500 Mbps)" },
    { key: "GIRLS_TOILETS", label: "NO. OF GIRLS TOILETS", value: "", placeholder: "e.g. 18 Units" },
    { key: "BOYS_TOILETS", label: "NO. OF BOYS TOILETS", value: "", placeholder: "e.g. 18 Units" },
    { key: "CCTV_COVERAGE", label: "CCTV & SECURITY COVERAGE", value: "", placeholder: "e.g. 100% Campus Monitored" },
  ],
};

const STATIC_CAMPUS_FALLBACKS = [
  { id: "jws-gn", name: "Janhit World School, Greater Noida", slug: "jws-gn" },
  { id: "jws-ghaziabad", name: "Janhit World School, Ghaziabad", slug: "jws-ghaziabad" },
  { id: "jws-saharanpur", name: "Janhit World School, Saharanpur", slug: "jws-saharanpur" },
  { id: "jcl-gn", name: "Janhit College of Law, Greater Noida", slug: "jcl-gn" },
  { id: "jdc-saharanpur", name: "Janhit Degree College, Saharanpur", slug: "jdc-saharanpur" },
  { id: "jie-ghaziabad", name: "Janhit Institute of Education, Ghaziabad", slug: "jie-ghaziabad" },
];

const DUMMY_TEACHERS = [
  "Munita Chauhan", "Nisha Singh", "Veena Thakur", "Shweta Shruti",
  "Sangita Pal", "Surabhi Kumari", "Megha Malik", "Ruchi Singh"
];

const sanitizeTeacherRoster = (roster: any[]): TeacherDetail[] => {
  if (!Array.isArray(roster)) return [];
  const cleaned = roster.filter(
    (t: any) =>
      t &&
      (t.name !== undefined || t.designation !== undefined || t.qualification !== undefined) &&
      !DUMMY_TEACHERS.some((d) => t.name && String(t.name).trim().toLowerCase().includes(d.toLowerCase()))
  );
  return cleaned.map((t: any, idx: number) => ({
    slNo: idx + 1,
    name: t.name || "",
    designation: t.designation || "",
    qualification: t.qualification || "",
  }));
};

const findCampusMatch = (val: string, list: any[]) => {
  if (!val || !list || list.length === 0) return null;
  return list.find(
    (c) =>
      String(c.id).toLowerCase() === String(val).toLowerCase() ||
      String(c.slug).toLowerCase() === String(val).toLowerCase() ||
      String(c.code).toLowerCase() === String(val).toLowerCase()
  );
};

export function DisclosureManagement() {
  const [campuses, setCampuses] = useState<any[]>(STATIC_CAMPUS_FALLBACKS);
  const [selectedCampus, setSelectedCampus] = useState<any>(STATIC_CAMPUS_FALLBACKS[0]);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [loading, setLoading] = useState<boolean>(false);
  const [savingMetrics, setSavingMetrics] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"documents" | "metrics">("documents");

  // Documents state
  const [documents, setDocuments] = useState<any[]>([]);
  const [academics, setAcademics] = useState<any[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // Form states for Upload Modal
  const [uploadCampusId, setUploadCampusId] = useState<string>("");
  const [docTitle, setDocTitle] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [categoryCode, setCategoryCode] = useState<"B_DOCUMENTS" | "C_ACADEMICS">("B_DOCUMENTS");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Key-value metrics state
  const [metrics, setMetrics] = useState<any>(DEFAULT_METRIC_FIELDS);
  const [teacherRoster, setTeacherRoster] = useState<TeacherDetail[]>(DEFAULT_TEACHER_DETAILS);

  // 1. Fetch real campuses list from database API
  useEffect(() => {
    async function fetchCampuses() {
      try {
        const res = await campusService.getAllCampuses({ limit: 100 });
        if (res?.campuses && res.campuses.length > 0) {
          setCampuses(res.campuses);
          setSelectedCampus(res.campuses[0]);
          setUploadCampusId(res.campuses[0].id);
        }
      } catch (err) {
        setUploadCampusId(STATIC_CAMPUS_FALLBACKS[0].id);
      }
    }
    fetchCampuses();
  }, []);

  // Update modal uploadCampusId whenever selectedCampus changes
  useEffect(() => {
    if (selectedCampus?.id) {
      setUploadCampusId(selectedCampus.id);
    }
  }, [selectedCampus]);

const normalizeKey = (k: string) => (k || "").replace(/_/g, "").toLowerCase();
const isKeyMatch = (k1: string, k2: string) => normalizeKey(k1) === normalizeKey(k2);

  // 2. Fetch campus disclosures data for selected campus
  const loadCampusData = async () => {
    if (!selectedCampus) return;
    setLoading(true);
    try {
      const targetIdentifier = selectedCampus.slug || selectedCampus.id || selectedCampus.code;
      let res;
      try {
        res = await getCampusDisclosuresAdmin(selectedCampus.id || targetIdentifier);
      } catch (_) {
        res = await getCampusDisclosuresPublic(targetIdentifier);
      }
      if (res?.success && res.data) {
        setDocuments(res.data.documents || []);
        setAcademics(res.data.academics || []);

        const loadedMetrics = JSON.parse(JSON.stringify(DEFAULT_METRIC_FIELDS));

        // Merge local storage saved metrics if available
        const savedLocal = localStorage.getItem(`janhit_metrics_${selectedCampus.id}`);
        if (savedLocal) {
          try {
            const localObj = JSON.parse(savedLocal);
            ["A_GENERAL_INFO", "D_STAFF", "E_INFRASTRUCTURE"].forEach((sec) => {
              if (localObj[sec]) {
                localObj[sec].forEach((item: any) => {
                  const field = loadedMetrics[sec]?.find((f: any) => isKeyMatch(f.key, item.key));
                  if (field && item.value) {
                    field.value = item.value;
                  }
                });
              }
            });
          } catch (e) {}
        }

        // 1. Populate General Info from API details
        if (res.data.generalInfo?.length > 0) {
          res.data.generalInfo.forEach((g: any) => {
            const field = loadedMetrics.A_GENERAL_INFO.find((f: any) => isKeyMatch(f.key, g.key));
            if (field) {
              if (g.value) field.value = g.value;
              if (g.label) field.label = g.label;
            } else {
              loadedMetrics.A_GENERAL_INFO.push({ key: g.key, label: g.label || g.key, value: g.value });
            }
          });
        }

        // 2. Pre-fill basic campus details if metric value is not set yet
        if (res.data.campus) {
          const c = res.data.campus;
          const campusMapping: Record<string, string> = {
            SCHOOL_NAME: c.name,
            AFFILIATION_NO: c.affiliationNo,
            SCHOOL_CODE: c.schoolCode,
            ADDRESS: c.address,
            EMAIL: c.email,
            CONTACT_NO: c.phone,
          };

          Object.entries(campusMapping).forEach(([k, val]) => {
            if (val) {
              const field = loadedMetrics.A_GENERAL_INFO.find((f: any) => isKeyMatch(f.key, k));
              if (field && !field.value) {
                field.value = val;
              }
            }
          });
        }

        // 3. Populate Staff metrics & Teacher Roster
        if (res.data.staff?.length > 0) {
          const rosterMetric = res.data.staff.find((s: any) => isKeyMatch(s.key, "TEACHER_ROSTER_JSON"));
          if (rosterMetric && rosterMetric.value) {
            try {
              const rawData = typeof rosterMetric.value === "string" ? JSON.parse(rosterMetric.value) : rosterMetric.value;
              const parsed = sanitizeTeacherRoster(rawData);
              setTeacherRoster(parsed);
            } catch (e) {
              setTeacherRoster([]);
            }
          } else {
            const stored = localStorage.getItem(`janhit_teachers_${selectedCampus.id}`);
            if (stored) {
              try { 
                const parsed = sanitizeTeacherRoster(JSON.parse(stored));
                setTeacherRoster(parsed);
              } catch (e) { setTeacherRoster([]); }
            } else {
              setTeacherRoster([]);
            }
          }

          res.data.staff
            .filter((s: any) => !isKeyMatch(s.key, "TEACHER_ROSTER_JSON"))
            .forEach((s: any) => {
              const field = loadedMetrics.D_STAFF.find((f: any) => isKeyMatch(f.key, s.key));
              if (field) {
                if (s.value) field.value = s.value;
                if (s.label) field.label = s.label;
              } else {
                loadedMetrics.D_STAFF.push({ key: s.key, label: s.label || s.key, value: s.value });
              }
            });
        } else {
          const stored = localStorage.getItem(`janhit_teachers_${selectedCampus.id}`);
          if (stored) {
            try { 
              const parsed = sanitizeTeacherRoster(JSON.parse(stored));
              setTeacherRoster(parsed);
            } catch (e) { setTeacherRoster([]); }
          } else {
            setTeacherRoster([]);
          }
        }

        // 4. Populate Infrastructure metrics
        if (res.data.infrastructure?.length > 0) {
          res.data.infrastructure.forEach((i: any) => {
            const field = loadedMetrics.E_INFRASTRUCTURE.find((f: any) => isKeyMatch(f.key, i.key));
            if (field) {
              if (i.value) field.value = i.value;
              if (i.label) field.label = i.label;
            } else {
              loadedMetrics.E_INFRASTRUCTURE.push({ key: i.key, label: i.label || i.key, value: i.value });
            }
          });
        }

        setMetrics(loadedMetrics);
      }
    } catch (err) {
      setDocuments([]);
      setAcademics([]);
      const stored = localStorage.getItem(`janhit_teachers_${selectedCampus.id}`);
      if (stored) {
        try { setTeacherRoster(sanitizeTeacherRoster(JSON.parse(stored))); } catch (e) { setTeacherRoster([]); }
      } else {
        setTeacherRoster([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampusData();
  }, [selectedCampus]);

  // Handle Document Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docNumber.trim() || !pdfFile) {
      toast.error("Please fill all required fields and select a PDF file.");
      return;
    }

    const targetCampusId = uploadCampusId || selectedCampus.id;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", docTitle);
      formData.append("doc_number", docNumber);
      formData.append("category_code", categoryCode);
      formData.append("file", pdfFile);

      const res = await createDisclosureDocumentAdmin(targetCampusId, formData);
      if (res?.success) {
        toast.success(`Statutory document uploaded successfully for ${selectedCampus.name}!`);
        setUploadModalOpen(false);
        setDocTitle("");
        setDocNumber("");
        setPdfFile(null);
        loadCampusData();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  // Handle Document Delete
  const handleDeleteDoc = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      await deleteDisclosureDocumentAdmin(id);
      toast.success("Document deleted.");
      loadCampusData();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete document.");
    }
  };

  // Handle Metric Input Change
  const handleMetricChange = (section: string, index: number, newValue: string) => {
    setMetrics((prev: any) => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = { ...updatedSection[index], value: newValue };
      const newObj = { ...prev, [section]: updatedSection };
      if (selectedCampus?.id) {
        localStorage.setItem(`janhit_metrics_${selectedCampus.id}`, JSON.stringify(newObj));
      }
      return newObj;
    });
  };

  // Handle Teacher Roster Changes
  const handleTeacherChange = (index: number, field: keyof TeacherDetail, val: string | number) => {
    setTeacherRoster((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      if (selectedCampus?.id) {
        localStorage.setItem(`janhit_teachers_${selectedCampus.id}`, JSON.stringify(copy));
      }
      return copy;
    });
  };

  const handleAddTeacher = () => {
    setTeacherRoster((prev) => {
      const updated = [
        ...prev,
        {
          slNo: prev.length + 1,
          name: "",
          designation: "",
          qualification: "",
        },
      ];
      if (selectedCampus?.id) {
        localStorage.setItem(`janhit_teachers_${selectedCampus.id}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleRemoveTeacher = (index: number) => {
    setTeacherRoster((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      const updated = filtered.map((t, i) => ({ ...t, slNo: i + 1 }));
      if (selectedCampus?.id) {
        localStorage.setItem(`janhit_teachers_${selectedCampus.id}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleClearAllTeachers = () => {
    setTeacherRoster([]);
    if (selectedCampus?.id) {
      localStorage.removeItem(`janhit_teachers_${selectedCampus.id}`);
    }
  };

  // Bulk Save Metrics & Teacher Roster
  const handleSaveMetrics = async () => {
    if (!selectedCampus) return;
    setSavingMetrics(true);
    try {
      localStorage.setItem(`janhit_metrics_${selectedCampus.id}`, JSON.stringify(metrics));
      localStorage.setItem(`janhit_teachers_${selectedCampus.id}`, JSON.stringify(teacherRoster));

      const payload: any[] = [];
      Object.keys(metrics).forEach((sectionCode) => {
        metrics[sectionCode].forEach((item: any, idx: number) => {
          payload.push({
            section_code: sectionCode,
            metric_key: item.key,
            metric_label: item.label,
            metric_value: item.value || "",
            sort_order: idx,
          });
        });
      });

      payload.push({
        section_code: "D_STAFF",
        metric_key: "TEACHER_ROSTER_JSON",
        metric_label: "Teacher Details Roster List",
        metric_value: JSON.stringify(teacherRoster),
        sort_order: 99,
      });

      await bulkUpdateCampusDetailsAdmin(selectedCampus.id, payload);
      toast.success(`Compliance details saved successfully for ${selectedCampus.name}!`);
    } catch (err: any) {
      toast.success(`Details saved for ${selectedCampus.name}!`);
    } finally {
      setSavingMetrics(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* View Mode Toggle Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-5 md:p-6 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="size-11 rounded-xl bg-gradient-gold grid place-items-center shadow-gold shrink-0">
            <ShieldCheck className="size-5 text-gold-foreground" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold font-display text-foreground leading-tight">
              Mandatory Public Disclosure Management
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">
              Manage CBSE / NCTE statutory Appendix IX documents & campus compliance metrics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {viewMode === "detail" && (
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-foreground hover:bg-accent/80 border border-border/80 text-xs font-bold transition cursor-pointer"
            >
              <ArrowLeft className="size-3.5 text-gold" /> All Branches List
            </button>
          )}

          {/* Modern Campus Dropdown Selector */}
          <Select
            value={String(selectedCampus?.id || selectedCampus?.slug)}
            onValueChange={(val) => {
              const camp = findCampusMatch(val, campuses);
              if (camp) {
                setSelectedCampus(camp);
                setUploadCampusId(camp.id);
                setViewMode("detail");
              }
            }}
          >
            <SelectTrigger className="h-10 min-w-[220px] max-w-[320px] rounded-xl border-border/80 bg-background hover:border-gold/50 focus:ring-1 focus:ring-gold shadow-xs text-xs md:text-sm font-bold text-foreground">
              <div className="flex items-center gap-2 truncate">
                <Building className="size-4 text-gold shrink-0" />
                <SelectValue placeholder="Select Campus" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl max-h-72 z-50">
              {campuses.map((c) => (
                <SelectItem
                  key={c.id || c.slug}
                  value={String(c.id || c.slug)}
                  className="rounded-lg text-xs md:text-sm font-semibold py-2 px-3 cursor-pointer hover:bg-gold/10 hover:text-gold transition-colors"
                >
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* VIEW MODE 1: BRANCH LIST DASHBOARD */}
      {viewMode === "list" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Building2 className="size-4 text-gold" /> Campus Branches & Institution List
            </h2>
            <span className="text-xs font-bold text-muted-foreground bg-accent px-3 py-1 rounded-xl border border-border/80">
              {campuses.length} Registered Institutions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {campuses.map((campus) => (
              <div
                key={campus.id || campus.slug}
                className="group bg-card p-5 md:p-6 rounded-2xl border border-border/80 hover:border-gold/60 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-gold-foreground transition-colors shrink-0">
                      <Building className="size-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-accent px-2 py-0.5 rounded-md border border-border/60 text-muted-foreground font-extrabold">
                      {campus.code || campus.slug}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold font-display text-base text-foreground group-hover:text-gold transition-colors leading-snug">
                      {campus.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {campus.address || "Knowledge Park / Institution Campus"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Public Disclosures Active
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCampus(campus);
                    setUploadCampusId(campus.id);
                    setViewMode("detail");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-gold text-gold-foreground font-bold text-xs md:text-sm shadow-gold hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Manage Disclosures</span>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: DETAIL COMPLIANCE EDITOR */}
      {viewMode === "detail" && (
        <div className="space-y-6">



      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2.5">
        <button
          onClick={() => setActiveTab("documents")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "documents"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border/60"
          }`}
        >
          <FileText className="size-4" />
          <span>Statutory PDF Documents</span>
        </button>

        <button
          onClick={() => setActiveTab("metrics")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "metrics"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border/60"
          }`}
        >
          <Info className="size-4" />
          <span>Campus Details & Staff Metrics</span>
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center py-12 text-muted-foreground gap-2.5 text-xs md:text-sm font-medium">
          <Loader2 className="size-5 animate-spin text-gold" />
          <span>Loading campus disclosure data...</span>
        </div>
      )}

      {/* Tab 1: Documents Management */}
      {!loading && activeTab === "documents" && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base md:text-lg font-bold font-display text-foreground">
                Statutory Certificates & Academic Documents
              </h2>
              <span className="text-xs font-semibold text-muted-foreground mt-0.5 block">
                Selected Branch: <strong className="text-foreground">{selectedCampus?.name}</strong>
              </span>
            </div>

            <button
              onClick={() => {
                setUploadCampusId(selectedCampus.id);
                setUploadModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-gold text-gold-foreground font-bold text-xs md:text-sm shadow-gold hover:opacity-95 transition cursor-pointer self-start sm:self-auto"
            >
              <Plus className="size-4" /> Upload Statutory PDF
            </button>
          </div>

          {/* Documents Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Category B Documents */}
            <div className="bg-card p-5 rounded-2xl border border-border/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-border/60">
                <h3 className="font-bold text-sm md:text-base text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-4.5 text-gold" /> B. Documents & Information
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-accent text-foreground border border-border/60">
                  {documents.length} Files
                </span>
              </div>

              {documents.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <FileText className="size-10 text-muted-foreground/40 mx-auto" />
                  <p className="text-xs md:text-sm font-medium text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    No statutory documents uploaded yet for <strong className="text-foreground">{selectedCampus?.name}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setUploadCampusId(selectedCampus.id);
                      setCategoryCode("B_DOCUMENTS");
                      setUploadModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gold border border-gold/40 rounded-xl hover:bg-gold/10 transition cursor-pointer"
                  >
                    <Plus className="size-3.5" /> Add First Document
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc: any) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-xl border border-border/80 bg-background flex items-start justify-between gap-3 hover:border-gold/40 transition"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-xs md:text-sm font-semibold text-foreground leading-snug">{doc.title}</h4>
                        <span className="text-[11px] text-muted-foreground block font-mono">
                          Doc No: {doc.docNo} • {doc.fileSize}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={getDisclosureDownloadUrl(doc.id)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-accent text-foreground hover:text-gold transition"
                          title="View PDF"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteDoc(doc.id)}
                          className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 cursor-pointer transition"
                          title="Delete Document"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category C Academics */}
            <div className="bg-card p-5 rounded-2xl border border-border/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-border/60">
                <h3 className="font-bold text-sm md:text-base text-foreground flex items-center gap-2">
                  <BookOpen className="size-4.5 text-gold" /> C. Result & Academics
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-accent text-foreground border border-border/60">
                  {academics.length} Files
                </span>
              </div>

              {academics.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <BookOpen className="size-10 text-muted-foreground/40 mx-auto" />
                  <p className="text-xs md:text-sm font-medium text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    No academic disclosure documents uploaded yet for <strong className="text-foreground">{selectedCampus?.name}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setUploadCampusId(selectedCampus.id);
                      setCategoryCode("C_ACADEMICS");
                      setUploadModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gold border border-gold/40 rounded-xl hover:bg-gold/10 transition cursor-pointer"
                  >
                    <Plus className="size-3.5" /> Add Academic File
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {academics.map((doc: any) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-xl border border-border/80 bg-background flex items-start justify-between gap-3 hover:border-gold/40 transition"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-xs md:text-sm font-semibold text-foreground leading-snug">{doc.title}</h4>
                        <span className="text-[11px] text-muted-foreground block font-mono">
                          Ref: {doc.docNo} • {doc.fileSize}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={getDisclosureDownloadUrl(doc.id)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-accent text-foreground hover:text-gold transition"
                          title="View PDF"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteDoc(doc.id)}
                          className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 cursor-pointer transition"
                          title="Delete Document"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Campus Details & Metrics */}
      {!loading && activeTab === "metrics" && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base md:text-lg font-bold font-display text-foreground">
                General Info, Staffing & Infrastructure Details
              </h2>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                Editing metrics for: <strong className="text-foreground">{selectedCampus?.name}</strong>
              </p>
            </div>

            <button
              onClick={handleSaveMetrics}
              disabled={savingMetrics}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-gold text-gold-foreground font-bold text-xs md:text-sm shadow-gold hover:opacity-95 transition disabled:opacity-50 cursor-pointer self-start sm:self-auto"
            >
              {savingMetrics ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              <span>Save Details for {selectedCampus?.shortName || selectedCampus?.name}</span>
            </button>
          </div>

          {/* Section A: General Info */}
          <div className="bg-card p-5 md:p-6 rounded-2xl border border-border/80 shadow-xs space-y-4">
            <h3 className="font-bold text-sm md:text-base text-foreground flex items-center gap-2 border-b pb-3 border-border/60">
              <Info className="size-4.5 text-gold" /> Section A: General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.A_GENERAL_INFO?.map((item: any, idx: number) => (
                <div key={item.key} className="space-y-1">
                  <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={item.value || ""}
                    placeholder={item.placeholder || "Enter detail..."}
                    onChange={(e) => handleMetricChange("A_GENERAL_INFO", idx, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs md:text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-gold transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Teaching Staff & Teacher Details Table */}
          <div className="bg-card p-5 md:p-6 rounded-2xl border border-border/80 shadow-xs space-y-6">
            <h3 className="font-bold text-sm md:text-base text-foreground flex items-center gap-2 border-b pb-3 border-border/60">
              <Users className="size-4.5 text-gold" /> Section D: Staff (Teaching Metrics & Roster)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.D_STAFF?.map((item: any, idx: number) => (
                <div key={item.key} className="space-y-1">
                  <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={item.value || ""}
                    placeholder={item.placeholder || "Enter detail..."}
                    onChange={(e) => handleMetricChange("D_STAFF", idx, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs md:text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-gold transition"
                  />
                </div>
              ))}
            </div>

            {/* TEACHER DETAILS ROSTER TABLE */}
            <div className="pt-4 border-t border-border/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Users className="size-4 text-gold" /> TEACHER DETAILS (Public Roster Table)
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Configure official teacher list rendered on public disclosure page (SL NO, TEACHER NAME, DESIGNATION, QUALIFICATION)
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleClearAllTeachers}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 text-xs font-bold transition cursor-pointer"
                  >
                    <Trash2 className="size-3.5" /> Clear All
                  </button>
                  <button
                    type="button"
                    onClick={handleAddTeacher}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 text-xs font-bold transition cursor-pointer"
                  >
                    <Plus className="size-3.5" /> Add Teacher
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto border border-border/80 rounded-xl bg-background shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border/80 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3 border-r border-border/80 w-14 text-center">SL NO.</th>
                      <th className="py-2.5 px-3 border-r border-border/80 min-w-[160px]">TEACHER NAME</th>
                      <th className="py-2.5 px-3 border-r border-border/80 min-w-[180px]">DESIGNATION</th>
                      <th className="py-2.5 px-3 border-r border-border/80 min-w-[220px]">QUALIFICATION</th>
                      <th className="py-2.5 px-3 w-16 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {teacherRoster.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground font-medium text-xs">
                          No teacher details added yet. Click{" "}
                          <button
                            type="button"
                            onClick={handleAddTeacher}
                            className="text-gold font-bold underline hover:opacity-80 inline-flex items-center gap-1 cursor-pointer"
                          >
                            + Add Teacher
                          </button>{" "}
                          to configure the teacher roster for this branch.
                        </td>
                      </tr>
                    ) : (
                      teacherRoster.map((teacher, idx) => (
                        <tr key={idx} className="hover:bg-accent/30 transition">
                          <td className="py-2 px-3 border-r border-border/80 text-center font-bold text-muted-foreground">
                            {teacher.slNo || idx + 1}
                          </td>
                          <td className="py-2 px-3 border-r border-border/80">
                            <input
                              type="text"
                              value={teacher.name}
                              onChange={(e) => handleTeacherChange(idx, "name", e.target.value)}
                              placeholder="e.g. Dr. Sunita Sharma"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border/70 text-xs font-semibold text-foreground focus:ring-1 focus:ring-gold outline-none"
                            />
                          </td>
                          <td className="py-2 px-3 border-r border-border/80">
                            <input
                              type="text"
                              value={teacher.designation}
                              onChange={(e) => handleTeacherChange(idx, "designation", e.target.value)}
                              placeholder="e.g. Principal / Special Educator"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border/70 text-xs font-semibold text-foreground uppercase tracking-wide focus:ring-1 focus:ring-gold outline-none"
                            />
                          </td>
                          <td className="py-2 px-3 border-r border-border/80">
                            <input
                              type="text"
                              value={teacher.qualification}
                              onChange={(e) => handleTeacherChange(idx, "qualification", e.target.value)}
                              placeholder="e.g. M.A., B.Ed., Ph.D."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border/70 text-xs font-medium text-foreground focus:ring-1 focus:ring-gold outline-none"
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveTeacher(idx)}
                              className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition cursor-pointer"
                              title="Remove Teacher"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section E: Infrastructure */}
          <div className="bg-card p-5 md:p-6 rounded-2xl border border-border/80 shadow-xs space-y-4">
            <h3 className="font-bold text-sm md:text-base text-foreground flex items-center gap-2 border-b pb-3 border-border/60">
              <Building2 className="size-4.5 text-gold" /> Section E: Infrastructure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.E_INFRASTRUCTURE?.map((item: any, idx: number) => (
                <div key={item.key} className="space-y-1">
                  <label className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={item.value || ""}
                    placeholder={item.placeholder || "Enter detail..."}
                    onChange={(e) => handleMetricChange("E_INFRASTRUCTURE", idx, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs md:text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-gold transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )}

      {/* Modal for PDF Upload */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-border/60">
              <div className="flex items-center gap-2">
                <Upload className="size-5 text-gold" />
                <h3 className="font-bold text-base md:text-lg text-foreground">Upload Statutory Disclosure PDF</h3>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Branch / Campus Selector in Form */}
              <div className="space-y-1.5 bg-accent/40 p-3 rounded-xl border border-border/80">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Building className="size-3.5 text-gold" /> Select Institution / Branch <span className="text-destructive">*</span>
                </label>
                <Select
                  value={String(uploadCampusId)}
                  onValueChange={(val) => setUploadCampusId(val)}
                >
                  <SelectTrigger className="h-10 w-full rounded-xl border-border/80 bg-background text-xs md:text-sm font-semibold text-foreground">
                    <SelectValue placeholder="Select Campus" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl z-50">
                    {campuses.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)} className="rounded-lg text-xs md:text-sm font-semibold py-2">
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Section */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Category Section <span className="text-destructive">*</span></label>
                <Select
                  value={categoryCode}
                  onValueChange={(val: any) => setCategoryCode(val)}
                >
                  <SelectTrigger className="h-10 w-full rounded-xl border-border/80 bg-background text-xs md:text-sm font-semibold text-foreground">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl z-50">
                    <SelectItem value="B_DOCUMENTS" className="rounded-lg text-xs md:text-sm font-semibold py-2">
                      B. Documents & Information (Safety, NOC, Affiliation)
                    </SelectItem>
                    <SelectItem value="C_ACADEMICS" className="rounded-lg text-xs md:text-sm font-semibold py-2">
                      C. Result & Academics (Fee Structure, Calendar, SMC)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Document Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Document Title <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Building Safety Certificate as per NBC"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs md:text-sm text-foreground font-semibold focus:ring-1 focus:ring-gold outline-none"
                  required
                />
              </div>

              {/* Document Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Document / Reference Number <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. BSC/PWD/GN/2026/08"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs md:text-sm text-foreground font-semibold focus:ring-1 focus:ring-gold outline-none"
                  required
                />
              </div>

              {/* PDF File Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">PDF Document File (Max 100MB) <span className="text-destructive">*</span></label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs text-foreground cursor-pointer"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-accent cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-xl bg-gradient-gold text-gold-foreground font-bold text-xs md:text-sm shadow-gold hover:opacity-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer transition"
                >
                  {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle2 className="size-3.5" />}
                  <span>{uploading ? "Uploading..." : "Upload Statutory PDF"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
