import { defineGuide } from '../../lib/guide-types';
import type { Helpers } from '../../lib/guide-types';

/** Guía 2027: lo que ya fija la norma para enero de 2027 (bono social) y lo que aún no se ha publicado (peajes, cargos). */
const V = (h: Helpers) => {
  const B = h.P.bono_social;
  const pe = h.P.peajes, ca = h.P.cargos, im = h.P.impuestos;
  const base = 50;
  return { B, pe, ca, im, base, v26: base * B.descuento_vulnerable, v27: base * B.descuento_ordinario_vulnerable, s26: base * B.descuento_severo, s27: base * B.descuento_ordinario_severo };
};
const filasPeajes = (h: Helpers, pendiente: string) => {
  const { pe, ca } = V(h);
  return [
    ...(['P1', 'P2'] as const).map((p) => [`${h.lang === 'es' ? 'Potencia' : 'Power'} ${p} (€/kW ${h.lang === 'es' ? 'y año' : 'a year'})`, h.num(pe.potencia_eur_kw_ano[p], 6), h.num(ca.potencia_eur_kw_ano[p], 6), pendiente]),
    ...(['P1', 'P2', 'P3'] as const).map((p) => [`${h.lang === 'es' ? 'Energía' : 'Energy'} ${p} (€/kWh)`, h.num(pe.energia_eur_kwh[p], 6), h.num(ca.energia_eur_kwh[p], 6), pendiente]),
  ];
};

export default defineGuide({
  id: 'luz2027',
  group: 'guia',
  order: 6,
  mini: 'bono2027',
  miniHref: 'bono',
  related: ['bono', 'peajes', 'impuestos', 'factura', 'pvpc'],
  sources: ['rdl7_2026', 'rd897', 'cnmcPeajes2026', 'tedCargos2026', 'ley38Iee', 'ley37Iva'],
  es: {
    slug: 'luz-ano-que-viene',
    nav: 'La luz en 2027',
    card: 'Qué cambia en la factura el 1 de enero de 2027: el bono social baja, los peajes y cargos aún no se conocen.',
    title: 'Precio de la luz 2027: bono social, peajes e IVA tras 2026',
    description: 'Precio de la luz 2027: el bono social pasa del 42,5 % de 2026 al 35 % en enero si no hay prórroga; peajes y cargos aún sin publicar, IVA del 21 % sin cambios.',
    h1: 'Precio de la luz en 2027: lo que ya se sabe y lo que falta',
    intro: 'El precio de la luz cambia el 1 de enero de 2027 en varias piezas de la factura. Una ya está fijada por la norma; las otras se publican en diciembre.',
    resume: (h) => {
      const v = V(h);
      return `Para 2027 solo hay una cifra de la factura de la luz que ya fija la norma: el bono social. El Real Decreto-ley 7/2026 mantiene el descuento en el ${h.pct(v.B.descuento_vulnerable, 1)} para los consumidores vulnerables y en el ${h.pct(v.B.descuento_severo, 1)} para los vulnerables severos hasta el 31 de diciembre de 2026. Desde el 1 de enero de 2027, si el Gobierno no aprueba una prórroga, vuelven los porcentajes del Real Decreto 897/2017: ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} y ${h.pct(v.B.descuento_ordinario_severo, 0)}. Sobre ${h.eur(v.base, 0)} al mes de potencia y energía, un hogar vulnerable pasaría de ${h.eur(v.v26, 2)} a ${h.eur(v.v27, 2)} de descuento. Los peajes de la CNMC y los cargos del Ministerio para 2027 aún no se han publicado: los de 2026 salieron el 18 y el 23 de diciembre de 2025. El IVA del 21 % y el impuesto eléctrico del 5,11 % son los tipos generales de la ley, sin fecha de fin. El precio de la energía del PVPC sigue al mercado cada día y no se puede anunciar.`;
    },
    faqs: (h) => {
      const v = V(h);
      return [
        { q: '¿Baja el bono social de la luz en enero de 2027?', a: `Sí, si no hay prórroga. El Real Decreto-ley 7/2026 fija el ${h.pct(v.B.descuento_vulnerable, 1)} y el ${h.pct(v.B.descuento_severo, 1)} solo hasta el 31 de diciembre de 2026. Desde el 1 de enero de 2027 se aplican los porcentajes del Real Decreto 897/2017, ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} para vulnerables y ${h.pct(v.B.descuento_ordinario_severo, 0)} para severos. Una nueva norma podría mantener los de 2026; a 22 de noviembre de 2026 no se ha publicado ninguna.` },
        { q: '¿Cuándo se publican los peajes y cargos de la luz para 2027?', a: 'En diciembre, si se sigue el calendario de los últimos años. La CNMC aprobó los peajes de 2026 el 18 de diciembre de 2025 y el Ministerio fijó los cargos por orden del 23 de diciembre de 2025, para aplicarlos desde el 1 de enero. A 22 de noviembre de 2026 no hay valores de 2027 en el BOE; esta página y el simulador se actualizarán cuando salgan.' },
        { q: '¿Subirá el IVA de la luz en 2027?', a: `No hay ningún cambio aprobado. El ${h.pct(v.im.iva_general, 0)} es el tipo general de la Ley 37/1992 y el impuesto eléctrico del 5,11 % es el de la Ley 38/1992; ninguno de los dos tiene fecha de fin. Las rebajas de 2026 fueron temporales y ligadas al IPC de la electricidad; para 2027 no hay ninguna regla parecida publicada.` },
        { q: '¿Cuánto pagaré de luz en 2027?', a: 'Nadie puede dar hoy esa cifra con rigor. La energía del PVPC depende del mercado mayorista de cada día y de los futuros, y los peajes y cargos de 2027 aún no existen. Lo que sí se puede calcular es tu factura con los precios actuales en el simulador, y cuánto cambia tu bono social en enero con el calculador de esta página.' },
      ];
    },
    body: (h) => {
      const v = V(h);
      return `<h2>El bono social en 2027: del ${h.pct(v.B.descuento_vulnerable, 1)} al ${h.pct(v.B.descuento_ordinario_vulnerable, 0)}</h2>
<p>El ${h.src('rd897', 'Real Decreto 897/2017')}, que regula el bono social, fija como regla un descuento del ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} sobre la potencia y la energía del PVPC para los consumidores vulnerables y del ${h.pct(v.B.descuento_ordinario_severo, 0)} para los vulnerables severos. En 2026 esos porcentajes no se aplican: el ${h.src('rdl7_2026', 'Real Decreto-ley 7/2026')} los sube, «con carácter excepcional», al ${h.pct(v.B.descuento_vulnerable, 1)} y al ${h.pct(v.B.descuento_severo, 1)} entre el 1 de enero y el 31 de diciembre de 2026.</p>
<p>Si el Gobierno no aprueba otra norma antes de fin de año, el 1 de enero de 2027 vuelve la regla general. El bono social no desaparece y las condiciones para tenerlo no cambian: lo que baja es el porcentaje. El calculador de arriba muestra el efecto en tu caso, y la tabla da el ejemplo de un hogar con ${h.eur(v.base, 0)} al mes de potencia y energía, sin impuestos.</p>
${h.table(['Categoría', 'Hasta el 31/12/2026', 'Desde el 1/1/2027', 'Diferencia al mes'], [
  ['Vulnerable', `${h.pct(v.B.descuento_vulnerable, 1)}: ${h.eur(v.v26, 2)}`, `${h.pct(v.B.descuento_ordinario_vulnerable, 0)}: ${h.eur(v.v27, 2)}`, h.eur(v.v26 - v.v27, 2)],
  ['Vulnerable severo', `${h.pct(v.B.descuento_severo, 1)}: ${h.eur(v.s26, 2)}`, `${h.pct(v.B.descuento_ordinario_severo, 0)}: ${h.eur(v.s27, 2)}`, h.eur(v.s26 - v.s27, 2)],
], `Descuento sobre ${h.eur(v.base, 0)} de potencia y energía al mes, todo el consumo dentro del límite. RDL 7/2026 y RD 897/2017, art. 6.`, ['l', 'r', 'r', 'r'])}
<p>El descuento se aplica solo a la energía que cabe en el límite anual de kWh de cada hogar, que va de ${h.num(v.B.limites_kwh_ano[0].kwh, 0)} kWh para una o dos personas a ${h.num(v.B.limites_kwh_ano[3].kwh, 0)} kWh para familias numerosas. Si consumes más, la parte que excede no tiene descuento ni en 2026 ni en 2027. Para comprobar si tienes derecho y cuánto te corresponde, usa el ${h.a('bono', 'calculador del bono social')}.</p>
<h2>Peajes y cargos de 2027: todavía sin publicar</h2>
<p>La parte regulada de la factura tiene dos piezas que cambian cada 1 de enero. Los peajes de transporte y distribución los aprueba la CNMC: los de 2026 están en la ${h.src('cnmcPeajes2026', 'resolución de 18 de diciembre de 2025')}. Los cargos del sistema, que pagan las renovables con retribución regulada, el déficit de años anteriores y los sobrecostes de las islas, los fija el Ministerio: los de 2026 están en la ${h.src('tedCargos2026', 'Orden TED/1524/2025, de 23 de diciembre')}.</p>
<p>A 22 de noviembre de 2026 no se ha publicado en el BOE ningún valor de 2027. Si se repite el calendario, saldrán en la segunda quincena de diciembre. Hasta entonces, la tabla recoge los términos de la tarifa 2.0TD vigentes en 2026, que son los que usa el ${h.a('factura', 'simulador de factura')}. Las cifras de 2027 se añadirán a la última columna cuando estén en el BOE.</p>
${h.table(['Término 2.0TD', 'Peaje 2026', 'Cargo 2026', '2027'], filasPeajes(h, 'Pendiente'), 'Peajes: resolución de la CNMC de 18/12/2025. Cargos: Orden TED/1524/2025. Sin impuestos.', ['l', 'r', 'r', 'r'])}
<p>Los cambios de un año a otro suelen ser pequeños en la energía y algo mayores en la potencia, pero no hay ninguna propuesta pública de la CNMC para los peajes eléctricos de 2027 con la que adelantar una cifra. Por eso no damos estimación. La guía de ${h.a('peajes', 'peajes y cargos')} explica qué paga cada término y cómo pesa en tu factura.</p>
<h2>Impuestos de la luz en 2027</h2>
<p>El ${h.src('ley38Iee', 'impuesto especial sobre la electricidad')} tiene un tipo general del 5,11269632 %, con un mínimo de 1 € por MWh para los hogares, y el ${h.src('ley37Iva', 'IVA')} un tipo general del ${h.pct(v.im.iva_general, 0)}. Son los tipos de las leyes, sin fecha de fin. En 2026 se rebajaron por periodos, con reglas ligadas al IPC de la electricidad, que la guía de ${h.a('impuestos', 'impuestos de la luz')} explica mes a mes. Para 2027 no se ha aprobado ninguna rebaja ni ninguna regla parecida, así que, salvo una nueva norma, la factura de enero llevará los tipos generales.</p>
<h2>El precio de la energía en 2027</h2>
<p>Con el PVPC, el precio de cada kWh se fija cada día a partir del mercado mayorista y de una parte de mercados a plazo, como explica la guía sobre ${h.a('pvpc', 'qué es el PVPC')}. Ese precio no se puede anunciar con un año de antelación, y cualquier cifra para 2027 sería una previsión, no un dato. En el mercado libre, el precio es el que firmes en tu contrato: si se renueva en 2027, mira si la comercializadora lo cambia y compáralo con el PVPC.</p>
<h2>Qué hacer antes del 1 de enero de 2027</h2>
<ol>
<li>Si tienes bono social, calcula con el simulador de arriba cuánto sube tu factura si el descuento vuelve al ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} o al ${h.pct(v.B.descuento_ordinario_severo, 0)}.</li>
<li>Comprueba que tu bono no caduca: se renueva cada dos años y la comercializadora de referencia avisa antes del vencimiento.</li>
<li>Revisa la potencia contratada: es la parte de los peajes y cargos que más depende de ti.</li>
<li>Vuelve a esta página en la segunda quincena de diciembre, cuando la CNMC y el Ministerio publiquen los valores de 2027.</li>
</ol>`;
    },
  },
  en: {
    slug: 'electricity-price-next-year',
    nav: 'Electricity in 2027',
    card: 'What changes on the bill on 1 January 2027: the social discount falls, tolls and charges are not yet known.',
    title: 'Electricity Price Spain 2027: Social Discount After 2026',
    description: 'Electricity price Spain 2027: the social discount drops from 42.5% in 2026 to 35% in January unless extended; tolls not yet published, 21% VAT unchanged.',
    h1: 'Electricity prices in Spain in 2027: what is known and what is missing',
    intro: 'The electricity price in Spain changes on 1 January 2027 in several parts of the bill. One is already set by law; the others are published in December.',
    resume: (h) => {
      const v = V(h);
      return `For 2027, only one figure on the Spanish electricity bill is already set by law: the social discount, the bono social. Royal Decree-law 7/2026 keeps it at ${h.pct(v.B.descuento_vulnerable, 1)} for vulnerable consumers and ${h.pct(v.B.descuento_severo, 1)} for severely vulnerable ones until 31 December 2026. From 1 January 2027, unless the Government approves an extension, the Royal Decree 897/2017 rates return: ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} and ${h.pct(v.B.descuento_ordinario_severo, 0)}. On ${h.eur(v.base, 0)} a month of power and energy, a vulnerable household would go from a ${h.eur(v.v26, 2)} discount to ${h.eur(v.v27, 2)}. The CNMC network tolls and the Ministry system charges for 2027 are not yet published: the 2026 ones came out on 18 and 23 December 2025. The 21% VAT and the 5.11% electricity tax are the general statutory rates, with no end date. The PVPC energy price follows the market every day and cannot be announced in advance.`;
    },
    faqs: (h) => {
      const v = V(h);
      return [
        { q: 'Does the electricity social discount fall in January 2027?', a: `Yes, unless it is extended. Royal Decree-law 7/2026 sets ${h.pct(v.B.descuento_vulnerable, 1)} and ${h.pct(v.B.descuento_severo, 1)} only until 31 December 2026. From 1 January 2027 the Royal Decree 897/2017 rates apply: ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} for vulnerable and ${h.pct(v.B.descuento_ordinario_severo, 0)} for severely vulnerable consumers. A new decree could keep the 2026 rates; as of 22 November 2026 none has been published.` },
        { q: 'When are the 2027 electricity tolls and charges published?', a: 'In December, if the pattern of recent years holds. The CNMC approved the 2026 tolls on 18 December 2025 and the Ministry set the charges by an order of 23 December 2025, both applying from 1 January. As of 22 November 2026 there are no 2027 values in the Official Gazette; this page and the calculator will be updated when they appear.' },
        { q: 'Will VAT on electricity rise in 2027?', a: `No change has been approved. The ${h.pct(v.im.iva_general, 0)} rate is the general rate of Law 37/1992 and the 5.11% electricity tax comes from Law 38/1992; neither has an end date. The 2026 cuts were temporary and tied to the electricity price index; no similar rule has been published for 2027.` },
        { q: 'How much will I pay for electricity in 2027?', a: 'Nobody can give that figure reliably today. The PVPC energy price depends on the daily wholesale market and on forward prices, and the 2027 tolls and charges do not exist yet. What you can work out is your bill at current prices in the calculator, and how much your social discount changes in January with the calculator on this page.' },
      ];
    },
    body: (h) => {
      const v = V(h);
      return `<h2>The social discount in 2027: from ${h.pct(v.B.descuento_vulnerable, 1)} to ${h.pct(v.B.descuento_ordinario_vulnerable, 0)}</h2>
<p>${h.src('rd897', 'Royal Decree 897/2017')}, which governs the bono social, sets a standard discount of ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} on PVPC power and energy for vulnerable consumers and ${h.pct(v.B.descuento_ordinario_severo, 0)} for severely vulnerable ones. Those rates do not apply in 2026: ${h.src('rdl7_2026', 'Royal Decree-law 7/2026')} raises them, “on an exceptional basis”, to ${h.pct(v.B.descuento_vulnerable, 1)} and ${h.pct(v.B.descuento_severo, 1)} between 1 January and 31 December 2026.</p>
<p>If the Government does not approve another decree before the end of the year, the standard rule returns on 1 January 2027. The bono social does not disappear and the conditions to get it do not change: only the percentage falls. The calculator above shows the effect in your case, and the table gives the example of a household with ${h.eur(v.base, 0)} a month of power and energy, before taxes.</p>
${h.table(['Category', 'Until 31/12/2026', 'From 1/1/2027', 'Monthly difference'], [
  ['Vulnerable', `${h.pct(v.B.descuento_vulnerable, 1)}: ${h.eur(v.v26, 2)}`, `${h.pct(v.B.descuento_ordinario_vulnerable, 0)}: ${h.eur(v.v27, 2)}`, h.eur(v.v26 - v.v27, 2)],
  ['Severely vulnerable', `${h.pct(v.B.descuento_severo, 1)}: ${h.eur(v.s26, 2)}`, `${h.pct(v.B.descuento_ordinario_severo, 0)}: ${h.eur(v.s27, 2)}`, h.eur(v.s26 - v.s27, 2)],
], `Discount on ${h.eur(v.base, 0)} of power and energy a month, all use within the limit. RDL 7/2026 and RD 897/2017, art. 6.`, ['l', 'r', 'r', 'r'])}
<p>The discount only covers the energy that fits within each household’s annual kWh limit, from ${h.num(v.B.limites_kwh_ano[0].kwh, 0)} kWh for one or two people to ${h.num(v.B.limites_kwh_ano[3].kwh, 0)} kWh for large families. Anything above it gets no discount, in 2026 or in 2027. To check whether you qualify and how much you get, use the ${h.a('bono', 'social discount calculator')}.</p>
<h2>2027 tolls and charges: not yet published</h2>
<p>The regulated part of the bill has two pieces that change every 1 January. Transmission and distribution tolls are approved by the CNMC, the energy regulator: the 2026 ones are in its ${h.src('cnmcPeajes2026', 'resolution of 18 December 2025')}. System charges, which pay for renewables with regulated remuneration, the deficit from past years and the extra cost of the islands, are set by the Ministry: the 2026 ones are in ${h.src('tedCargos2026', 'Order TED/1524/2025 of 23 December')}.</p>
<p>As of 22 November 2026, no 2027 value has been published in the Official Gazette. If the usual calendar holds, they will come out in the second half of December. Until then, the table shows the 2.0TD tariff terms in force in 2026, which are the ones the ${h.a('factura', 'bill calculator')} uses. The 2027 figures will go in the last column once they are published.</p>
${h.table(['2.0TD term', '2026 toll', '2026 charge', '2027'], filasPeajes(h, 'Pending'), 'Tolls: CNMC resolution of 18/12/2025. Charges: Order TED/1524/2025. Before taxes.', ['l', 'r', 'r', 'r'])}
<p>Year-on-year changes are usually small on energy and somewhat larger on power, but there is no public CNMC proposal for the 2027 electricity tolls from which to draw a figure. That is why we give no estimate. The ${h.a('peajes', 'tolls and charges')} guide explains what each term pays for and how much it weighs on your bill.</p>
<h2>Electricity taxes in 2027</h2>
<p>The ${h.src('ley38Iee', 'special electricity tax')} has a general rate of 5.11269632%, with a minimum of €1 per MWh for households, and ${h.src('ley37Iva', 'VAT')} a general rate of ${h.pct(v.im.iva_general, 0)}. These are the statutory rates, with no end date. In 2026 they were cut for certain periods under rules tied to the electricity price index, which the ${h.a('impuestos', 'electricity taxes')} guide explains month by month. No cut or similar rule has been approved for 2027, so unless a new decree appears, the January bill will carry the general rates.</p>
<h2>The electricity price in Spain in 2027: the energy term</h2>
<p>On the PVPC, the price of each kWh is set every day from the wholesale market and a share of forward markets, as the guide on ${h.a('pvpc', 'what the PVPC is')} explains. That price cannot be announced a year ahead, and any figure for 2027 would be a forecast, not a fact. On the free market, the price is the one in your contract: if it renews in 2027, check whether the supplier changes it and compare it with the PVPC.</p>
<h2>What to do before 1 January 2027</h2>
<ol>
<li>If you have the social discount, use the calculator above to see how much your bill rises if the discount returns to ${h.pct(v.B.descuento_ordinario_vulnerable, 0)} or ${h.pct(v.B.descuento_ordinario_severo, 0)}.</li>
<li>Check that your discount is not about to expire: it is renewed every two years and the reference supplier warns you before it lapses.</li>
<li>Review your contracted power: it is the part of tolls and charges that depends most on you.</li>
<li>Come back to this page in the second half of December, when the CNMC and the Ministry publish the 2027 values.</li>
</ol>`;
    },
  },
});
