"use client";

import { useState, useEffect } from "react";
import { detectLang, syncUrlLang, type Lang } from "@/lib/i18n";

const labels: Record<string, any> = {
  pt: { title: "Calculadora Online Grátis", subtitle: "Porcentagem, juros compostos, regra de três, gorjeta e mais.", percentage: "Porcentagem", percentageDesc: "Calcule porcentagens rapidamente.", compound: "Juros Compostos", compoundDesc: "Calcule o montante com juros compostos.", rule3: "Regra de Três", rule3Desc: "Calcule a quarta proporcional.", tip: "Gorjeta / Divisão", tipDesc: "Calcule gorjeta e divida a conta.", discount: "Desconto", discountDesc: "Calcule preço com desconto.", value: "Valor", percent: "Porcentagem (%)", capital: "Capital Inicial", rate: "Taxa Mensal (%)", months: "Período (meses)", bill: "Valor da Conta", tipPct: "Gorjeta (%)", people: "Pessoas", price: "Preço Original", discountPct: "Desconto (%)", result: "Resultado" },
  tr: { title: "Ücretsiz Online Hesap Makinesi", subtitle: "Yüzde, bileşik faiz, orantı, bahşiş ve daha fazlası.", percentage: "Yüzde", percentageDesc: "Yüzdeleri hızlıca hesaplayın.", compound: "Bileşik Faiz", compoundDesc: "Bileşik faizle toplam tutarı hesaplayın.", rule3: "Orantı", rule3Desc: "Dördüncü orantılı değeri hesaplayın.", tip: "Bahşiş / Bölüşme", tipDesc: "Bahşiş hesaplayın ve hesabı bölün.", discount: "İndirim", discountDesc: "İndirimli fiyatı hesaplayın.", value: "Değer", percent: "Yüzde (%)", capital: "Başlangıç Sermayesi", rate: "Aylık Oran (%)", months: "Süre (ay)", bill: "Hesap Tutarı", tipPct: "Bahşiş (%)", people: "Kişi", price: "Orijinal Fiyat", discountPct: "İndirim (%)", result: "Sonuç" },
  th: { title: "เครื่องคิดเลขออนไลน์ฟรี", subtitle: "เปอร์เซ็นต์ ดอกเบี้ยทบต้น บัญญัติไตรยางศ์ ทิป และอื่นๆ", percentage: "เปอร์เซ็นต์", percentageDesc: "คำนวณเปอร์เซ็นต์อย่างรวดเร็ว", compound: "ดอกเบี้ยทบต้น", compoundDesc: "คำนวณเงินรวมด้วยดอกเบี้ยทบต้น", rule3: "บัญญัติไตรยางศ์", rule3Desc: "คำนวณค่าสัดส่วนที่สี่", tip: "ทิป / หาร", tipDesc: "คำนวณทิปและหารบิล", discount: "ส่วนลด", discountDesc: "คำนวณราคาหลังหักส่วนลด", value: "ค่า", percent: "เปอร์เซ็นต์ (%)", capital: "เงินต้น", rate: "อัตราต่อเดือน (%)", months: "ระยะเวลา (เดือน)", bill: "ยอดบิล", tipPct: "ทิป (%)", people: "จำนวนคน", price: "ราคาเดิม", discountPct: "ส่วนลด (%)", result: "ผลลัพธ์" },
  vn: { title: "Máy Tính Online Miễn Phí", subtitle: "Phần trăm, lãi kép, tỉ lệ thuận, tiền boa và hơn thế nữa.", percentage: "Phần trăm", percentageDesc: "Tính phần trăm nhanh chóng.", compound: "Lãi Kép", compoundDesc: "Tính tổng tiền với lãi kép.", rule3: "Tỉ Lệ Thuận", rule3Desc: "Tính giá trị tỉ lệ thứ tư.", tip: "Tiền Boa / Chia", tipDesc: "Tính tiền boa và chia hóa đơn.", discount: "Giảm Giá", discountDesc: "Tính giá sau giảm.", value: "Giá trị", percent: "Phần trăm (%)", capital: "Vốn Ban Đầu", rate: "Lãi Suất Tháng (%)", months: "Thời Gian (tháng)", bill: "Tiền Hóa Đơn", tipPct: "Tiền Boa (%)", people: "Số Người", price: "Giá Gốc", discountPct: "Giảm (%)", result: "Kết Quả" },
  en: { title: "Free Online Calculator", subtitle: "Percentage, compound interest, rule of three, tip calculator and more.", percentage: "Percentage", percentageDesc: "Calculate percentages quickly.", compound: "Compound Interest", compoundDesc: "Calculate compound interest total.", rule3: "Rule of Three", rule3Desc: "Calculate the fourth proportional.", tip: "Tip / Split", tipDesc: "Calculate tip and split the bill.", discount: "Discount", discountDesc: "Calculate discounted price.", value: "Value", percent: "Percentage (%)", capital: "Initial Capital", rate: "Monthly Rate (%)", months: "Period (months)", bill: "Bill Amount", tipPct: "Tip (%)", people: "People", price: "Original Price", discountPct: "Discount (%)", result: "Result" },
};

const calcs = [
  { id: "percentage", fields: [{ key: "value", type: "number" }, { key: "percent", type: "number" }], calc: (v: any) => { const n = +v.value||0, p = +v.percent||0; return `${(n*p/100).toFixed(2)} (${p}% de ${n})`; } },
  { id: "compound", fields: [{ key: "capital", type: "number" }, { key: "rate", type: "number" }, { key: "months", type: "number" }], calc: (v: any) => { const C=+v.capital||0, r=(+v.rate||0)/100, t=+v.months||0; const M=C*Math.pow(1+r,t); return `Montante: ${M.toFixed(2)} (Juros: ${(M-C).toFixed(2)})`; } },
  { id: "rule3", fields: [{ key: "a", type: "number" }, { key: "b", type: "number" }, { key: "c", type: "number" }], calc: (v: any) => { const a=+v.a||0,b=+v.b||0,c=+v.c||0; if(!a) return "A não pode ser zero"; return `X = ${((b*c)/a).toFixed(2)}`; } },
  { id: "tip", fields: [{ key: "bill", type: "number" }, { key: "tip", type: "number" }, { key: "people", type: "number" }], calc: (v: any) => { const b=+v.bill||0,t=+v.tip||0,p=+v.people||1; const total=b*(1+t/100); return `Total: ${total.toFixed(2)} | Por pessoa: ${(total/p).toFixed(2)}`; } },
  { id: "discount", fields: [{ key: "price", type: "number" }, { key: "discount", type: "number" }], calc: (v: any) => { const p=+v.price||0,d=+v.discount||0; return `Preço final: ${(p*(1-d/100)).toFixed(2)}`; } },
];

export default function CalcPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [active, setActive] = useState("percentage");
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const t = labels[lang] || labels.en;

  useEffect(() => {
    const detected = detectLang();
    setLang(detected);
    syncUrlLang(detected);
  }, []);

  const getVal = (calcId: string, key: string) => (values[calcId] || {})[key] || "";
  const setVal = (calcId: string, key: string, val: string) => setValues(prev => ({ ...prev, [calcId]: { ...(prev[calcId] || {}), [key]: val } }));
  const activeCalc = calcs.find(c => c.id === active)!;
  const result = activeCalc.calc(values[active] || {});

  return (
    <div className="flex-1"><main className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-slate-500">{t.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {calcs.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${active === c.id ? "bg-amber-500 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-amber-300"}`}>
            {t[c.id]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-md mx-auto">
        <h2 className="font-semibold text-lg mb-1">{t[active]}</h2>
        <p className="text-sm text-slate-500 mb-4">{t[`${active}Desc`]}</p>
        {activeCalc.fields.map(f => (
          <div key={f.key} className="mb-3">
            <label className="block text-sm font-medium mb-1">{t[f.key as keyof typeof t] || f.key}</label>
            <input type="number" value={getVal(active, f.key)} onChange={e => setVal(active, f.key, e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
          </div>
        ))}
        {result && <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center font-semibold text-gray-900">{result}</div>}
      </div>
    </main></div>
  );
}
