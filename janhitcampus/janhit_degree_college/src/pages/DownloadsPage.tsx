import { useState } from "react";
import { Download, FileText, Search, Calendar, Tag } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { DOWNLOADS_DATA, DownloadDocument } from "@/data/downloadsData";

const categories = [
  "All",
  "Admission Forms",
  "Prospectus",
  "Fee Structure",
  "Syllabus",
  "Notices",
  "Examination Documents",
  "Public Disclosure Documents",
  "Other Documents",
];

export function DownloadsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDocs = DOWNLOADS_DATA.filter((doc) => {
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Downloads Center | Janhit Degree College Saharanpur"
        description="Download admission forms, college prospectus, syllabus, fee structure schedule, examination documents and mandatory public disclosures for Janhit Degree College Saharanpur."
      />

      <Breadcrumb
        title="Downloads & Official Documents Center"
        items={[{ label: "Downloads" }]}
      />

      <section className="py-12 md:py-16 bg-beige/40">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Controls: Search & Category Pills */}
          <div className="bg-white p-6 rounded-xl border border-gold/30 shadow-md mb-10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy">Document Repository</h2>
                <p className="text-xs text-navy/70">
                  Select a category or search for official forms, syllabus PDFs, and announcements.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/50" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-gold/30 bg-beige/30 text-navy focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gold/15">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "gradient-gold text-navy-deep shadow"
                      : "bg-beige/60 text-navy hover:bg-gold/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Table / Grid */}
          {filteredDocs.length > 0 ? (
            <div className="bg-white rounded-xl border border-gold/30 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-navy text-white uppercase text-[11px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-4 px-6">Document Title</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Date</th>
                      <th className="py-4 px-4">File Format</th>
                      <th className="py-4 px-6 text-right">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/15">
                    {filteredDocs.map((doc: DownloadDocument) => (
                      <tr key={doc.id} className="hover:bg-beige/30 transition-colors">
                        <td className="py-4 px-6 font-bold text-navy flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gold shrink-0" />
                          <span>{doc.title}</span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-navy bg-gold/15 px-2.5 py-0.5 rounded border border-gold/30">
                            <Tag className="h-3 w-3 text-gold" />
                            <span>{doc.category}</span>
                          </span>
                        </td>

                        <td className="py-4 px-4 text-navy/70 text-xs">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-navy/50" />
                            <span>{doc.date}</span>
                          </span>
                        </td>

                        <td className="py-4 px-4 text-xs font-semibold text-navy">
                          <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-200">
                            {doc.fileType} ({doc.fileSize})
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <a
                            href={doc.downloadUrl}
                            download
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Downloading: ${doc.title}`);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded gradient-gold text-navy-deep font-bold text-xs shadow hover:shadow-md transition-all"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download PDF</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gold/20">
              <p className="text-navy font-serif text-lg">No documents found in this category.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-gold hover:underline"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
