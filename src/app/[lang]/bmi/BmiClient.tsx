"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getBmiMessages } from "@/lib/tool-messages/bmi-messages";
import { type Lang } from "@/lib/i18n";

type Category = "underweight" | "normal" | "overweight" | "obese1" | "obese2" | "obese3";
type Mode = "adult" | "child";

const COLORS: Record<Category, string> = {
  underweight: "#3b82f6", normal: "#22c55e", overweight: "#eab308", obese1: "#f97316", obese2: "#ef4444", obese3: "#dc2626",
};

const ADULT_RANGES: { max: number; cat: Category }[] = [
  { max: 18.4, cat: "underweight" }, { max: 24.9, cat: "normal" }, { max: 29.9, cat: "overweight" },
  { max: 34.9, cat: "obese1" }, { max: 39.9, cat: "obese2" }, { max: Infinity, cat: "obese3" },
];

const VALID_LANGS: Lang[] = ["pt", "tr", "th", "vn", "en"];

export default function BmiClient() {
  const params = useParams();
  const lang: Lang = VALID_LANGS.includes(params.lang as Lang) ? (params.lang as Lang) : "en";
  const [mode, setMode] = useState<Mode>("adult");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [result, setResult] = useState<{ bmi: number; category: Category; idealMin: number; idealMax: number } | null>(null);

  const t = getBmiMessages(lang);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;
    const bmi = w / (h * h);
    const cat = ADULT_RANGES.find(r => bmi <= r.max)!.cat;
    setResult({ bmi: parseFloat(bmi.toFixed(1)), category: cat, idealMin: 18.5 * h * h, idealMax: 24.9 * h * h });
  };

  const bmiToPercent = (bmi: number) => Math.min(Math.max((bmi - 13) / (40 - 13) * 100, 2), 98);

  return (
    <div className="flex-1">
      <main className="max-w-xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.hero.title}</h1>
          <p className="text-slate-500">{t.hero.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex gap-2 mb-4">
            <button onClick={() => setMode("adult")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === "adult" ? "bg-amber-500 text-white" : "bg-slate-100"}`}>{t.form.adult}</button>
            <button onClick={() => setMode("child")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === "child" ? "bg-amber-500 text-white" : "bg-slate-100"}`}>{t.form.child}</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGender("male")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium ${gender === "male" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-slate-50 border"}`}>{t.form.male}</button>
            <button onClick={() => setGender("female")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium ${gender === "female" ? "bg-pink-100 text-pink-700 border border-pink-300" : "bg-slate-50 border"}`}>{t.form.female}</button>
          </div>
          {mode === "child" && (
            <div><label className="block text-sm font-medium mb-1">{t.form.age}</label><input type="number" value={age} onChange={e => setAge(e.target.value)} min={2} max={19} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">{t.form.height}</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
            <div><label className="block text-sm font-medium mb-1">{t.form.weight}</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <button onClick={calculate} className="w-full py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors">{t.form.calculate}</button>
        </div>

        {result && (
          <div className="mt-6 bg-white rounded-2xl p-6 border border-slate-200 text-center">
            <div className="text-5xl font-extrabold mb-1" style={{ color: COLORS[result.category] }}>{result.bmi}</div>
            <p className="text-sm text-slate-500 mb-1">{t.result.bmi}</p>
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: COLORS[result.category] }}>{t.result[result.category]}</span>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4 relative">
              <div className="absolute inset-0 flex">
                <div className="w-[27%] h-full" style={{ backgroundColor: COLORS.underweight }} />
                <div className="w-[33%] h-full" style={{ backgroundColor: COLORS.normal }} />
                <div className="w-[23%] h-full" style={{ backgroundColor: COLORS.overweight }} />
                <div className="w-[17%] h-full" style={{ backgroundColor: COLORS.obese1 }} />
              </div>
              <div className="absolute top-[-4px] w-3 h-5 bg-white border-2 border-slate-800 rounded-sm transition-all duration-500" style={{ left: `calc(${bmiToPercent(result.bmi)}% - 6px)` }} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-slate-500">{t.result.bmi}</p><p className="font-semibold">{result.bmi}</p></div>
              <div><p className="text-slate-500">{t.result.idealWeight}</p><p className="font-semibold">{result.idealMin.toFixed(1)} – {result.idealMax.toFixed(1)} kg</p></div>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl text-sm text-slate-500">
              <p className="font-semibold text-gray-900 mb-1">{t.result.advice}</p>
              <p>{t.result.advices[result.category]}</p>
            </div>
          </div>
        )}
        {!result && <p className="text-center text-sm text-slate-400 mt-6">{t.result.noResult}</p>}
      </main>
    </div>
  );
}
