import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, Search, Filter } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/inspection/results')
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(() => {
        setReports([
          { id: "INSP-9041", component_name: "COMP_9041", result: "FAIL", defect_type: "SURFACE_CRACK", confidence: 0.94, timestamp: "2026-09-20 10:14:00" },
          { id: "INSP-9040", component_name: "COMP_9040", result: "PASS", defect_type: "NONE", confidence: 0.99, timestamp: "2026-09-20 10:10:12" },
          { id: "INSP-9039", component_name: "COMP_9039", result: "FAIL", defect_type: "SCRATCH", confidence: 0.92, timestamp: "2026-09-20 09:55:04" }
        ]);
      });
  }, []);

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Inspection ID,Component,Result,Defect Type,Confidence,Timestamp",
         ...reports.map(r => `${r.id},${r.component_name},${r.result},${r.defect_type},${r.confidence},${r.timestamp}`)
        ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "PAI_IR_Inspection_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const filtered = reports.filter(r => 
    r.component_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.defect_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4">
          <FileText className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">INDUSTRIAL QUALITY & OPERATIONAL REPORTS</h1>
            <p className="text-xs text-slate-400">Downloadable Inspection Logs, Defect Analytics, PDF Summaries, & Audit Reports</p>
          </div>
        </div>

        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow transition-all"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-all"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>PRINT PDF SUMMARY</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search report by component name, defect type, or PASS/FAIL result..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-mono">
                <th className="p-3">INSPECTION ID</th>
                <th className="p-3">COMPONENT NAME</th>
                <th className="p-3">RESULT</th>
                <th className="p-3">DEFECT TYPE</th>
                <th className="p-3">CONFIDENCE</th>
                <th className="p-3">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {filtered.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="p-3 text-cyan-400 font-bold">{row.id}</td>
                  <td className="p-3 font-semibold text-slate-100">{row.component_name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.result === 'PASS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                      {row.result}
                    </span>
                  </td>
                  <td className="p-3 text-amber-300">{row.defect_type}</td>
                  <td className="p-3 text-emerald-400 font-bold">{(row.confidence * 100).toFixed(0)}%</td>
                  <td className="p-3 text-slate-400">{row.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
