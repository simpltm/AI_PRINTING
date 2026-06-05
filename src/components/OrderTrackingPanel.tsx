import React from 'react';
import { CheckCircle, Package, Truck, Info, QrCode } from 'lucide-react';
import { Language } from '../types';

interface Props {
  orderId: string;
  lang: Language;
}

export default function OrderTrackingPanel({ orderId, lang }: Props) {
  // Mock data for the scanned order
  const statusSteps = [
    {
      id: 'received',
      done: true,
      title: { uz: 'Buyurtma qabul qilindi', ru: 'Заказ принят', en: 'Order Received' }
    },
    {
      id: 'printed',
      done: true,
      title: { uz: 'Chop etildi', ru: 'Напечатано', en: 'Printed' }
    },
    {
      id: 'ready',
      done: true,
      title: { uz: 'Olib ketishga tayyor', ru: 'Готов к выдаче', en: 'Ready for Pickup' }
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111111] border border-white/10 rounded-2xl p-6 space-y-8 shadow-2xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-16 h-16 bg-brand-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-cyan/20">
            <Package className="w-8 h-8 text-brand-cyan" />
          </div>
          <h1 className="text-2xl font-display font-bold">
            {lang === 'uz' ? "Buyurtma Ma'lumotlari" : lang === 'ru' ? "Информация о заказе" : "Order Details"}
          </h1>
          <p className="text-slate-400 font-mono text-sm flex items-center justify-center gap-2">
            <QrCode className="w-4 h-4" />
            <span>ID: {orderId}</span>
          </p>
        </div>

        {/* Status Timeline */}
        <div className="bg-[#0D0D0D] p-5 rounded-xl border border-white/5 space-y-4 relative z-10">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">
            {lang === 'uz' ? 'Holat' : lang === 'ru' ? 'Статус' : 'Status'}
          </h3>
          <div className="space-y-4">
            {statusSteps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-4 relative">
                {idx !== statusSteps.length - 1 && (
                  <div className={`absolute left-3 top-6 bottom-[-16px] w-0.5 ${step.done ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                )}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${step.done ? 'bg-emerald-500 text-[#050505]' : 'bg-slate-800 text-slate-500'}`}>
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className={`text-sm font-medium ${step.done ? 'text-white' : 'text-slate-500'}`}>
                  {step.title[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Mock */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
            {lang === 'uz' ? 'Tafsilotlar' : lang === 'ru' ? 'Детали' : 'Details'}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-[#050505] p-3 rounded-lg border border-white/5">
              <div className="text-slate-500 text-xs mb-1">Format</div>
              <div className="font-mono">A4 (210×297)</div>
            </div>
            <div className="bg-[#050505] p-3 rounded-lg border border-white/5">
              <div className="text-slate-500 text-xs mb-1">Material</div>
              <div className="font-mono">Glossy 130g</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => window.location.href = window.location.pathname}
          className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold rounded-lg transition-colors mt-4 relative z-10"
        >
          {lang === 'uz' ? 'Bosh sahifaga qaytish' : lang === 'ru' ? 'Вернуться на главную' : 'Back to Home'}
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FF3E00]/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
