/** Mini: el descuento del bono social en 2026 y desde el 1 de enero de 2027, si no hay prórroga. */
import type { MiniSpec } from '../mini-types';
import { T, eur, pct, type L } from './_kit';
import { P } from '../engine/params';

const B = P.bono_social;

export default (l: L): MiniSpec => ({
  title: T(l, '¿Cuánto baja tu bono social en 2027?', 'How much does your social discount drop in 2027?'),
  cta: T(l, 'Calcular el bono social completo', 'Work out the full social discount'),
  inputs: [
    { id: 'base', label: T(l, 'Potencia y energía al mes, sin impuestos', 'Power and energy per month, before taxes'), def: 50, unit: '€', max: 1000 },
    { id: 'cat', label: T(l, 'Categoría', 'Category'), def: 1, options: [{ value: '1', label: T(l, 'Vulnerable', 'Vulnerable') }, { value: '2', label: T(l, 'Vulnerable severo', 'Severely vulnerable') }] },
  ],
  run: ({ base, cat }) => {
    const sev = cat === 2;
    const d26 = sev ? B.descuento_severo : B.descuento_vulnerable;
    const d27 = sev ? B.descuento_ordinario_severo : B.descuento_ordinario_vulnerable;
    const b = Math.max(0, base);
    return {
      head: [T(l, 'Descuento al mes desde enero de 2027', 'Discount per month from January 2027'), eur(b * d27, l)],
      rows: [
        [T(l, `Hasta el 31 de diciembre de 2026 (${pct(d26, l)})`, `Until 31 December 2026 (${pct(d26, l)})`), eur(b * d26, l)],
        [T(l, `Desde el 1 de enero de 2027 (${pct(d27, l)})`, `From 1 January 2027 (${pct(d27, l)})`), eur(b * d27, l)],
        [T(l, 'Pagarías de más al mes', 'Extra to pay per month'), eur(b * (d26 - d27), l)],
        [T(l, 'Pagarías de más en un año', 'Extra to pay over a year'), eur(12 * b * (d26 - d27), l)],
      ],
      note: T(l, 'Si todo tu consumo está dentro del límite de kWh con descuento y el Gobierno no prorroga los porcentajes de 2026.', 'If all your use is within the discounted kWh limit and the Government does not extend the 2026 rates.'),
    };
  },
});
