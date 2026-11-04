/*!
 * tropelon — ইউনিকোড ↔ বিজয় বায়ান্ন (SutonnyMJ) রূপান্তর
 * সবটাই ব্রাউজারে চলে, লেখা কোথাও পাঠানো হয় না।
 *
 *   Bijoy.toBijoy(text)    ইউনিকোড → বিজয়
 *   Bijoy.toUnicode(text)  বিজয় → ইউনিকোড
 *   Bijoy.fix(text)        এলোমেলো লেখা ঠিক করা (বিজয় ধরা পড়লে ইউনিকোডে আনে)
 */
(function (root) {
  'use strict';

  var HAS = '\u09CD';                       // ্ (হসন্ত)
  var DRA = '\u09DC', DHA = '\u09DD', YA = '\u09DF';   // ড় ঢ় য়
  var BIJOY_DIGITS = '০১২৩৪৫৬৭৮৯';

  /* =====================  ইউনিকোড → বিজয়  ===================== */

  var VOWEL = { 'অ': 'A', 'আ': 'Av', 'ই': 'B', 'ঈ': 'C', 'উ': 'D', 'ঊ': 'E', 'ঋ': 'F', 'এ': 'G', 'ঐ': 'H', 'ও': 'I', 'ঔ': 'J' };

  var CONS = {
    'ক': 'K', 'খ': 'L', 'গ': 'M', 'ঘ': 'N', 'ঙ': 'O', 'চ': 'P', 'ছ': 'Q', 'জ': 'R', 'ঝ': 'S', 'ঞ': 'T',
    'ট': 'U', 'ঠ': 'V', 'ড': 'W', 'ঢ': 'X', 'ণ': 'Y', 'ত': 'Z', 'থ': '_', 'দ': '`', 'ধ': 'a', 'ন': 'b',
    'প': 'c', 'ফ': 'd', 'ব': 'e', 'ভ': 'f', 'ম': 'g', 'য': 'h', 'র': 'i', 'ল': 'j', 'শ': 'k', 'ষ': 'l',
    'স': 'm', 'হ': 'n', 'ৎ': 'r'
  };
  CONS[DRA] = 'o'; CONS[DHA] = 'p'; CONS[YA] = 'q';

  var MARK_B = { '\u0982': 's', '\u0983': 't', '\u0981': 'u' };
  var KAR_B = { '\u09BE': 'v', '\u09BF': 'w', '\u09C0': 'x', '\u09C1': 'y', '\u09C2': '~', '\u09C3': '„', '\u09C7': '†', '\u09C8': 'ˆ', '\u09CB': '†v', '\u09CC': '†Š', '\u09D7': 'Š' };
  var PUNCT_B = { '।': '|', '‘': 'Ô', '’': 'Õ', '“': 'Ò', '”': 'Ó' };

  // হসন্তসহ "আধা" রূপ (পরের বর্ণের সাথে যুক্ত হয়)
  var HALF = { 'স': '¯', 'ষ': '®', 'ন': 'š', 'দ': '˜', 'ম': '¤', 'চ': '”', 'ঙ': '•' };

  // বিশেষ যুক্তাক্ষর ও বর্ণ+কার গ্লিফ
  var CONJ = {
    'ক\u09CDক': '°', 'ক\u09CDট': '±', 'ক\u09CDষ\u09CDম': '²', 'ক\u09CDত': '³', 'ক\u09CDম': '´', 'ক\u09CDর': 'µ', 'ক\u09CDষ': 'ÿ', 'ক\u09CDস': '·', 'ক\u09CDব': 'K¡', 'ক\u09CDল': 'K¬',
    'গ\u09CDদ': 'º', 'গ\u09CDধ': '»', 'গ\u09CDন': 'Mœ', 'গ\u09CDম': 'M¥', 'গ\u09CDল': 'Mø',
    'ঙ\u09CDক': '¼', 'ঙ\u09CDক\u09CDষ': '•ÿ', 'ঙ\u09CDখ': '•L', 'ঙ\u09CDগ': '½', 'ঙ\u09CDঘ': '•N',
    'চ\u09CDচ': '”P', 'চ\u09CDছ': '”Q', 'চ\u09CDছ\u09CDব': '”Q¡', 'চ\u09CDঞ': '”T',
    'জ\u09CDজ': '¾', 'জ\u09CDজ\u09CDব': '¾¡', 'জ\u09CDঝ': 'À', 'জ\u09CDঞ': 'Á', 'জ\u09CDব': 'R¡',
    'ঞ\u09CDচ': 'Â', 'ঞ\u09CDছ': 'Ã', 'ঞ\u09CDজ': 'Ä', 'ঞ\u09CDঝ': 'Å',
    'ট\u09CDট': 'Æ', 'ট\u09CDব': 'U¡', 'ট\u09CDম': 'U¥',
    'ড\u09CDড': 'Ç',
    'ণ\u09CDট': 'È', 'ণ\u09CDঠ': 'É', 'ণ\u09CDড': 'Ê', 'ণ\u09CDব': 'Y^',
    'ত\u09CDত': 'Ë', 'ত\u09CDত\u09CDব': 'Ë¡', 'ত\u09CDথ': 'Ì', 'ত\u09CDন': 'Zœ', 'ত\u09CDম': 'Z¥', 'ত\u09CDব': 'Z¡', 'ত\u09CDর': 'Î',
    'থ\u09CDব': '_¡',
    'দ\u09CDগ': '˜M', 'দ\u09CDঘ': '˜N', 'দ\u09CDদ': 'Ï', 'দ\u09CDধ': '×', 'দ\u09CDব': 'Ø', 'দ\u09CDভ': '™¢', 'দ\u09CDম': 'Ù',
    'ধ\u09CDব': 'aŸ', 'ধ\u09CDম': 'a¥',
    'ন\u09CDট': '›U', 'ন\u09CDঠ': 'Ú', 'ন\u09CDড': 'Û', 'ন\u09CDত': 'šÍ', 'ন\u09CDত\u09CDর': 'š¿', 'ন\u09CDত\u09CDব': 'šÍ¡', 'ন\u09CDথ': 'š’',
    'ন\u09CDদ': '›`', 'ন\u09CDদ\u09CDব': '›Ø', 'ন\u09CDধ': 'Ü', 'ন\u09CDন': 'bœ', 'ন\u09CDব': 'š^', 'ন\u09CDম': 'b¥', 'ন\u09CDস': 'Ý',
    'প\u09CDট': 'Þ', 'প\u09CDত': 'ß', 'প\u09CDন': 'cœ', 'প\u09CDপ': 'à', 'প\u09CDল': 'cø', 'প\u09CDস': 'á',
    'ফ\u09CDল': 'd¬',
    'ব\u09CDজ': 'â', 'ব\u09CDদ': 'ã', 'ব\u09CDধ': 'ä', 'ব\u09CDব': 'eŸ', 'ব\u09CDল': 'eø',
    'ভ\u09CDর': 'å',
    'ম\u09CDন': 'gœ', 'ম\u09CDপ': '¤ú', 'ম\u09CDপ\u09CDর': '¤cÖ', 'ম\u09CDফ': 'ç', 'ম\u09CDব': '¤^', 'ম\u09CDভ': '¤¢', 'ম\u09CDভ\u09CDর': '¤£', 'ম\u09CDম': '¤§', 'ম\u09CDল': '¤ø',
    'ল\u09CDক': 'é', 'ল\u09CDগ': 'ê', 'ল\u09CDট': 'ë', 'ল\u09CDড': 'ì', 'ল\u09CDপ': 'í', 'ল\u09CDফ': 'î', 'ল\u09CDব': 'j¦', 'ল\u09CDম': 'j¥', 'ল\u09CDল': 'jø',
    'শ\u09CDচ': 'ð', 'শ\u09CDছ': 'ñ', 'শ\u09CDন': 'kœ', 'শ\u09CDব': 'k¦', 'শ\u09CDম': 'k¥', 'শ\u09CDল': 'kø',
    'ষ\u09CDক': '®‹', 'ষ\u09CDক\u09CDর': '®Œ', 'ষ\u09CDট': 'ó', 'ষ\u09CDঠ': 'ô', 'ষ\u09CDণ': 'ò', 'ষ\u09CDপ': '®ú', 'ষ\u09CDফ': 'õ', 'ষ\u09CDম': '®§',
    'স\u09CDক': '¯‹', 'স\u09CDক\u09CDর': '¯Œ', 'স\u09CDট': '÷', 'স\u09CDখ': 'ö', 'স\u09CDত': '¯Í', 'স\u09CDত\u09CDর': '¯¿', 'স\u09CDথ': '¯’', 'স\u09CDন': 'mœ',
    'স\u09CDপ': '¯ú', 'স\u09CDফ': 'ù', 'স\u09CDব': '¯^', 'স\u09CDম': '¯§', 'স\u09CDল': '¯ø',
    'হ\u09CDণ': 'nè', 'হ\u09CDন': 'ý', 'হ\u09CDব': 'nŸ', 'হ\u09CDম': 'þ', 'হ\u09CDল': 'n¬'
  };

  // একক বর্ণ + কার মিলে তৈরি গ্লিফ (শুধু একক বর্ণের ক্ষেত্রে)
  var LIG = { 'গ\u09C1': '¸', 'র\u09C1': 'i“', 'র\u09C2': 'iƒ', 'শ\u09C1': 'ï', 'হ\u09C1': 'û', 'হ\u09C3': 'ü' };
  // যুক্তাক্ষর + ু
  var CONJ_KAR = { 'ন\u09CDত\u09C1': 'š‘', 'স\u09CDত\u09C1': '¯‘', 'দ\u09CDর\u09C1': '`ª“', 'গ\u09CDর\u09C1': 'Mªy' };

  var CONS_SET = 'কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ' + DRA + DHA + YA + 'ৎ';
  var INDEP_SET = 'অআইঈউঊঋএঐওঔ';
  var KAR_SET = '\u09BE\u09BF\u09C0\u09C1\u09C2\u09C3\u09C7\u09C8\u09CB\u09CC\u09D7';
  var MARK_SET = '\u0982\u0983\u0981';

  function isCons(c) { return !!c && c.length === 1 && CONS_SET.indexOf(c) > -1; }

  // ব-ফলা, ম-ফলা ইত্যাদির গ্লিফ (c = আগের বর্ণ, n = পরের বর্ণ)
  function postFor(c, n) {
    switch (n) {
      case 'র': return '«';
      case 'য': return '¨';
      case 'ল': return 'ø';
      case 'ন': return 'œ';
      case 'ণ': return 'è';
      case 'ব': return 'ধবহ'.indexOf(c) > -1 ? 'Ÿ' : ('ণনমস'.indexOf(c) > -1 ? '^' : ('শল'.indexOf(c) > -1 ? '¦' : '¡'));
      case 'ম': return 'মষস'.indexOf(c) > -1 ? '§' : '¥';
      case 'প': return HALF[c] ? 'ú' : null;
      case 'ত': return HALF[c] ? 'Í' : null;
      case 'থ': return HALF[c] ? '’' : null;
      case 'ক': return HALF[c] ? '‹' : null;
      case 'ভ': return HALF[c] ? '¢' : null;
    }
    return null;
  }

  // হসন্তে জোড়া বর্ণের সারি (chain) → বিজয়
  function emitChain(ch) {
    var res = '', i = 0, n = ch.length, join = false;
    while (i < n) {
      if (join) {                       // আগের গ্লিফের সাথে জুড়ে যাওয়া বর্ণ
        var g = postFor(ch[i - 1], ch[i]);
        if (g) { res += g; i++; continue; }
        res += '&'; join = false;       // জোড় না মিললে দৃশ্যমান হসন্ত
      }
      var done = false;
      for (var k = Math.min(n - i, 5); k >= 2; k--) {
        var key = ch.slice(i, i + k).join(HAS);
        if (CONJ[key]) { res += CONJ[key]; i += k; join = i < n; done = true; break; }
      }
      if (done) continue;
      var c = ch[i];
      if (i === n - 1) { res += CONS[c]; i++; continue; }
      var pg = postFor(c, ch[i + 1]);
      if (pg) { res += (HALF[c] || CONS[c]) + pg; i += 2; join = i < n; }
      else if (HALF[c]) { res += HALF[c]; i++; }
      else { res += CONS[c] + '&'; i++; }
    }
    return res;
  }

  function normUni(s) {
    return s
      .replace(/ড\u09BC/g, DRA).replace(/ঢ\u09BC/g, DHA).replace(/য\u09BC/g, YA)
      .replace(/\u09C7\u09BE/g, '\u09CB').replace(/\u09C7\u09D7/g, '\u09CC')
      .replace(/অ\u09BE/g, 'আ');
  }

  // য়, ড়, ঢ় কে ইউনিকোডের স্ট্যান্ডার্ড (বর্ণ + নুক্তা) রূপে ফেরত দেয়
  function denorm(s) {
    return s.replace(/\u09DC/g, '\u09A1\u09BC').replace(/\u09DD/g, '\u09A2\u09BC').replace(/\u09DF/g, '\u09AF\u09BC');
  }

  function readCluster(s, i) {
    var n = s.length, cl = { reph: false, chain: [], vowel: '', vpost: '', kars: [], marks: [], start: i };
    var c = s[i];
    if (INDEP_SET.indexOf(c) > -1) {
      cl.vowel = c; i++;
      while (s[i] === HAS && s[i + 1] === 'য') { cl.vpost += '¨'; i += 2; }   // অ্যা
    }
    else {
      if (c === 'র' && s[i + 1] === HAS && isCons(s[i + 2])) { cl.reph = true; i += 2; c = s[i]; }
      cl.chain.push(c); i++;
      for (;;) {
        var j = i;
        while (j < n && (s[j] === '\u200C' || s[j] === '\u200D')) j++;
        if (s[j] === HAS && isCons(s[j + 1])) { cl.chain.push(s[j + 1]); i = j + 2; } else break;
      }
    }
    for (;;) {
      var d = s[i];
      if (d === undefined) break;
      if (KAR_SET.indexOf(d) > -1) { cl.kars.push(d); i++; }
      else if (MARK_SET.indexOf(d) > -1) { cl.marks.push(d); i++; }
      else break;
    }
    cl.end = i;
    return cl;
  }

  function emitCluster(cl, prev) {
    var wordStart = prev === undefined || /[\s\u00A0\-–—\/(\[{"'“‘]/.test(prev);
    var E = wordStart ? '†' : '‡', AI = wordStart ? 'ˆ' : '‰';
    var marks = '';
    cl.marks.forEach(function (m) { marks += MARK_B[m]; });

    if (cl.vowel) {
      var v = VOWEL[cl.vowel] + cl.vpost;
      cl.kars.forEach(function (k) { v += KAR_B[k] || ''; });
      return v + marks;
    }

    var kars = cl.kars.slice(), pre = '', post = '', body = null;

    if (cl.chain.length === 1 && kars.length && LIG[cl.chain[0] + kars[0]]) {
      body = LIG[cl.chain[0] + kars[0]]; kars.shift();
    } else if (kars[0] === '\u09C1' && CONJ_KAR[cl.chain.join(HAS) + '\u09C1']) {
      body = CONJ_KAR[cl.chain.join(HAS) + '\u09C1']; kars.shift();
    }
    if (body === null) {
      body = emitChain(cl.chain);
      if (kars[0] === '\u09C1' && body.slice(-1) === '¨') {   // ত্যু → Zz¨ (ু আগে, ্য পরে)
        body = body.slice(0, -1) + 'z¨'; kars.shift();
      }
    }
    kars.forEach(function (k) {
      switch (k) {
        case '\u09BF': pre = 'w'; break;
        case '\u09C7': pre = E; break;
        case '\u09C8': pre = AI; break;
        case '\u09CB': pre = E; post += 'v'; break;
        case '\u09CC': pre = E; post += 'Š'; break;
        default: post += KAR_B[k] || '';
      }
    });
    return pre + body + (cl.reph ? '©' : '') + post + marks;
  }

  function toBijoy(text) {
    var s = normUni(String(text == null ? '' : text)), out = '', i = 0, n = s.length;
    while (i < n) {
      var c = s[i];
      if (INDEP_SET.indexOf(c) > -1 || isCons(c)) {
        var cl = readCluster(s, i);
        out += emitCluster(cl, s[i - 1]);
        i = cl.end;
      } else if (BIJOY_DIGITS.indexOf(c) > -1) { out += BIJOY_DIGITS.indexOf(c); i++; }
      else if (PUNCT_B[c] !== undefined) { out += PUNCT_B[c]; i++; }
      else if (c === '\u200C' || c === '\u200D') { i++; }
      else if (KAR_SET.indexOf(c) > -1) { out += KAR_B[c] || ''; i++; }
      else if (MARK_SET.indexOf(c) > -1) { out += MARK_B[c]; i++; }
      else if (c === HAS) { out += '&'; i++; }
      else { out += c; i++; }
    }
    return out;
  }

  /* =====================  বিজয় → ইউনিকোড  ===================== */

  var D_FULL = {};
  Object.keys(VOWEL).forEach(function (k) { if (VOWEL[k].length === 1) D_FULL[VOWEL[k]] = k; });
  Object.keys(CONS).forEach(function (k) { D_FULL[CONS[k]] = k; });

  var D_HALF = { '¯': 'স\u09CD', '®': 'ষ\u09CD', 'š': 'ন\u09CD', '›': 'ন\u09CD', '˜': 'দ\u09CD', '™': 'দ\u09CD', '¤': 'ম\u09CD', '”': 'চ\u09CD', '•': 'ঙ\u09CD' };

  var D_CONJ = {
    '°': 'ক\u09CDক', '±': 'ক\u09CDট', '²': 'ক\u09CDষ\u09CDম', '³': 'ক\u09CDত', '´': 'ক\u09CDম', 'µ': 'ক\u09CDর', '¶': 'ক\u09CDষ', '·': 'ক\u09CDস', '¸': 'গ\u09C1', '¹': 'জ\u09CDঞ',
    'º': 'গ\u09CDদ', '»': 'গ\u09CDধ', '¼': 'ঙ\u09CDক', '½': 'ঙ\u09CDগ', '¾': 'জ\u09CDজ', 'À': 'জ\u09CDঝ', 'Á': 'জ\u09CDঞ', 'Â': 'ঞ\u09CDচ', 'Ã': 'ঞ\u09CDছ', 'Ä': 'ঞ\u09CDজ',
    'Å': 'ঞ\u09CDঝ', 'Æ': 'ট\u09CDট', 'Ç': 'ড\u09CDড', 'È': 'ণ\u09CDট', 'É': 'ণ\u09CDঠ', 'Ê': 'ণ\u09CDড', 'Ë': 'ত\u09CDত', 'Ì': 'ত\u09CDথ', 'Î': 'ত\u09CDর', 'Ï': 'দ\u09CDদ',
    'Ð': 'ণ\u09CDড', 'Ø': 'দ\u09CDব', '×': 'দ\u09CDধ', 'Ù': 'দ\u09CDম', 'Ú': 'ন\u09CDঠ', 'Û': 'ন\u09CDড', 'Ü': 'ন\u09CDধ', 'Ý': 'ন\u09CDস', 'Þ': 'প\u09CDট', 'ß': 'প\u09CDত',
    'à': 'প\u09CDপ', 'á': 'প\u09CDস', 'â': 'ব\u09CDজ', 'ã': 'ব\u09CDদ', 'ä': 'ব\u09CDধ', 'å': 'ভ\u09CDর', 'ç': 'ম\u09CDফ', 'é': 'ল\u09CDক', 'ê': 'ল\u09CDগ', 'ë': 'ল\u09CDট',
    'ì': 'ল\u09CDড', 'í': 'ল\u09CDপ', 'î': 'ল\u09CDফ', 'ï': 'শ\u09C1', 'ð': 'শ\u09CDচ', 'ñ': 'শ\u09CDছ', 'ò': 'ষ\u09CDণ', 'ó': 'ষ\u09CDট', 'ô': 'ষ\u09CDঠ', 'õ': 'ষ\u09CDফ',
    'ö': 'স\u09CDখ', '÷': 'স\u09CDট', 'ù': 'স\u09CDফ', 'û': 'হ\u09C1', 'ü': 'হ\u09C3', 'ý': 'হ\u09CDন', 'þ': 'হ\u09CDম', 'ÿ': 'ক\u09CDষ'
  };

  // হসন্তসহ পরের বর্ণ/ফলা (আগের গ্লিফের সাথে জোড়া লাগে)
  var D_POST = {
    'ª': '\u09CDর', '«': '\u09CDর', 'Ö': '\u09CDর', '¨': '\u09CDয', '¬': '\u09CDল', 'ø': '\u09CDল', '\u00AD': '\u09CDল', 'œ': '\u09CDন', 'è': '\u09CDণ',
    'Ÿ': '\u09CDব', '¡': '\u09CDব', '^': '\u09CDব', '¦': '\u09CDব', '¥': '\u09CDম', '§': '\u09CDম', 'ú': '\u09CDপ', '—': '\u09CDত', 'Í': '\u09CDত', '¿': '\u09CDত\u09CDর',
    '‘': '\u09CDত\u09C1', '’': '\u09CDথ', '‹': '\u09CDক', 'Œ': '\u09CDক\u09CDর', '¢': '\u09CDভ', '£': '\u09CDভ\u09CDর', '&': '\u09CD'
  };

  var D_PRE = { 'w': '\u09BF', '†': '\u09C7', '‡': '\u09C7', 'ˆ': '\u09C8', '‰': '\u09C8' };
  var D_KARP = { 'v': '\u09BE', 'x': '\u09C0', 'y': '\u09C1', 'z': '\u09C1', '“': '\u09C1', '–': '\u09C1', 'æ': '\u09C1', '~': '\u09C2', 'ƒ': '\u09C2', '‚': '\u09C2', '„': '\u09C3', '…': '\u09C3', 'Š': '\u09D7' };
  var D_MARK = { 's': '\u0982', 't': '\u0983', 'u': '\u0981' };
  var D_SIMPLE = { '|': '।', 'Ò': '“', 'Ó': '”', 'Ô': '‘', 'Õ': '’', 'Ñ': '–' };
  for (var d = 0; d < 10; d++) D_SIMPLE[String(d)] = BIJOY_DIGITS[d];

  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }

  function toUnicode(text) {
    var s = String(text == null ? '' : text), n = s.length, i = 0, out = '';
    while (i < n) {
      var start = i, ch = s[i], pre = '';
      if (has(D_PRE, ch)) { pre = D_PRE[ch]; i++; }

      var core = '', hasFull = false, started = false;
      while (i < n) {
        ch = s[i];
        if (!hasFull && has(D_HALF, ch)) { core += D_HALF[ch]; i++; started = true; continue; }
        if (!hasFull && (has(D_FULL, ch) || has(D_CONJ, ch))) { core += has(D_FULL, ch) ? D_FULL[ch] : D_CONJ[ch]; hasFull = true; started = true; i++; continue; }
        if (started && ch === '&') { core += HAS; hasFull = false; i++; continue; }   // দৃশ্যমান হসন্ত: পরের বর্ণ একই যুক্তাক্ষরে
        if (started && has(D_POST, ch)) { core += D_POST[ch]; hasFull = true; i++; continue; }   // আধা + ফলা = সম্পূর্ণ; পরের বর্ণ নতুন গুচ্ছ
        break;
      }

      var reph = false;
      if (started) { while (s[i] === '©') { reph = true; i++; } }

      var kar = '', after = '';
      if (started) {
        while (i < n && has(D_KARP, s[i])) {
          kar += D_KARP[s[i]]; i++;
          while (i < n && has(D_POST, s[i])) { after += D_POST[s[i]]; i++; }   // z¨ : ু-কারের পরে ্য
        }
      }
      if (started) { while (s[i] === '©') { reph = true; i++; } }   // ্য-এর পরে এলে
      var marks = '';
      if (started) { while (i < n && has(D_MARK, s[i])) { marks += D_MARK[s[i]]; i++; } }

      if (!started) {
        if (pre) { out += pre; continue; }     // একা পড়ে থাকা পূর্ব-কার
        var c = s[i];
        if (has(D_MARK, c)) out += D_MARK[c];
        else if (has(D_KARP, c)) out += D_KARP[c];
        else if (c === '©') out += 'র\u09CD';
        else if (has(D_POST, c)) out += D_POST[c];
        else if (has(D_SIMPLE, c)) out += D_SIMPLE[c];
        else out += c;
        i++;
        continue;
      }

      var unit = (reph ? 'র\u09CD' : '') + (core + after).replace(/\u09CD{2,}/g, HAS);
      var ks = kar;
      if (pre === '\u09C7' && ks[0] === '\u09BE') ks = '\u09CB' + ks.slice(1);
      else if (pre === '\u09C7' && ks[0] === '\u09D7') ks = '\u09CC' + ks.slice(1);
      else ks = pre + ks;
      out += unit + ks + marks;
      if (i === start) i++;                    // নিরাপত্তা: অসীম লুপ ঠেকাতে
    }
    return denorm(out.replace(/\u0985\u09BE/g, '\u0986'));
  }

  /* =====================  এলোমেলো লেখা ঠিক করা  ===================== */

  var C_CLASS = '[\\u0995-\\u09B9\\u09DC\\u09DD\\u09DF\\u09CE]';
  var RE_ORPHAN = new RegExp(
    '(^|[^\\u0995-\\u09B9\\u09DC\\u09DD\\u09DF\\u09CE\\u200C\\u200D\\u09CD])([\\u09BF\\u09C7\\u09C8])(' + C_CLASS + '(?:\\u09CD' + C_CLASS + ')*)', 'g');
  var BIJOY_SPECIAL = /[†‡ˆ‰Š¯®š›˜™¤©¨ª«¬¡¢£¥§œÖŸ‹Œ—Í¿°±²³´µ¶·¸¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÎÏ×ØÙÚÛÜÝÞßàáâãäåçéêëìíîïðñòóôõö÷ùûüýþÿ]/g;

  function looksLikeBijoy(s) {
    var bn = (s.match(/[ঀ-\u09FF]/g) || []).length;
    if (bn > 0) return false;
    var sp = (s.match(BIJOY_SPECIAL) || []).length;
    if (sp > 0) return true;
    return /(^|[^A-Za-z])(Av|evsjv|Avwg|Avgvi|Gi|Ges|†K|wK)([^A-Za-z]|$)/.test(s);
  }

  function fixUnicode(s) {
    s = normUni(s);
    s = s.replace(/র[\u200C\u200D]\u09CDয|[\u200C\u200D]/g, function (m) { return m.length > 1 ? m : ''; });
    s = s.replace(/\u09CD[ \t\u00A0]+(?=[ক-হ])/g, HAS);
    s = s.replace(RE_ORPHAN, function (m, p, kar, cl) { return p + cl + kar; });
    s = s.replace(/([\u09BE-\u09CC])\1+/g, '$1');
    return denorm(normUni(s));
  }

  function fix(text) {
    var s = String(text == null ? '' : text);
    if (looksLikeBijoy(s)) return { text: fixUnicode(toUnicode(s)), detected: 'bijoy' };
    var f = fixUnicode(s);
    return { text: f, detected: 'unicode', changed: f !== s };
  }

  var api = { toBijoy: toBijoy, toUnicode: toUnicode, fix: fix, looksLikeBijoy: looksLikeBijoy };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.Bijoy = api;
})(typeof window !== 'undefined' ? window : this);
