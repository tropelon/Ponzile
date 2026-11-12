---
title: "মাসিক খরচের হিসাবের শিট: কী কী থাকবে, কীভাবে সাজাবেন"
title_en: "Monthly expense tracker sheet: what goes in and how to lay it out"
date: 2026-11-12 07:20
tags:
  - টেমপ্লেট
  - স্প্রেডশিট
description: দিনে এক মিনিটে আয়-খরচ লিখে মাস শেষে খাতভিত্তিক হিসাব পাওয়ার শিটের কাঠামো। Excel বা Google Sheets, দুটোতেই চলে। নিজে বানান, চাইলে আমরা বানিয়ে দিই।
description_en: The layout of a sheet where you log income and spending in a minute a day and get a category summary at month end. Works in Excel and Google Sheets. Build it yourself, or ask us to.
body_en: |
  This is the layout of a simple monthly tracker. It works in Excel and Google Sheets. You can build it yourself from this description.

  **Tab 1: "Transactions" (one row per entry)**

  - Columns, in order: Date | Details | Category | Income | Spending | Balance
  - Balance, first row (row 2): `=D2-E2`
  - Balance, from row 3 down: `=F2+D3-E3`. Copy it down, and it carries the balance forward.
  - Make the Category column a dropdown: in Google Sheets use Data, then Data validation, then Dropdown; in Excel use Data, then Data Validation, then List. Typing categories by hand leads to spelling differences, and the summary then splits one category in two.

  **Tab 2: "Summary"**

  - In column A, list your categories once each. Eight to ten is plenty: food, transport, bills, rent, study, health, family, other.
  - In column B, next to each category: `=SUMIF('Transactions'!C:C, A2, 'Transactions'!E:E)`. This adds up all the spending of that category.
  - Total income: `=SUM('Transactions'!D:D)`. Total spending: `=SUM('Transactions'!E:E)`.
  - If your regional settings use semicolons instead of commas inside formulas, replace the commas with semicolons.

  **Habits that keep it working**

  - Log the entry on the same day, in under a minute. Skipping three days is where most trackers die.
  - One tab per month. Copy the empty tab at the start of the next month and carry the closing balance forward by hand.
  - Add a chart on the summary tab only after a month of real entries.

  We build this kind of sheet to fit you: your own categories, one tab per month, the summary and a chart, set up in Excel or Google Sheets. See the [spreadsheet service](/services/) and the [price list](/pricing/), or send a [request](/contact/?service=spreadsheet).
---
এটা একটা সাধারণ মাসিক হিসাবের শিটের কাঠামো। Excel আর Google Sheets, দুটোতেই চলে। এই বর্ণনা দেখে আপনি নিজেও বানিয়ে নিতে পারবেন।

**প্রথম ট্যাব: "লেনদেন" (প্রতি এন্ট্রিতে একটা সারি)**

- কলামগুলো এই ক্রমে: তারিখ | বিবরণ | খাত | আয় | খরচ | ব্যালেন্স
- ব্যালেন্স, প্রথম সারিতে (২ নম্বর সারি): `=D2-E2`
- ব্যালেন্স, ৩ নম্বর সারি থেকে নিচে: `=F2+D3-E3`। এটা নিচে কপি করলে আগের ব্যালেন্স নিজে থেকে এগিয়ে চলে।
- খাত কলামটা ড্রপডাউন বানান। Google Sheets-এ Data → Data validation → Dropdown, Excel-এ Data → Data Validation → List। হাতে লিখলে বানানের ফারাক হয়, তখন সারাংশে একটা খাত ভেঙে দুটো হয়ে যায়।

**দ্বিতীয় ট্যাব: "সারাংশ"**

- A কলামে আপনার খাতগুলো একবার করে লিখুন। আট-দশটাই যথেষ্ট: খাবার, যাতায়াত, বিল, ভাড়া, পড়াশোনা, চিকিৎসা, পরিবার, অন্যান্য।
- B কলামে প্রতিটা খাতের পাশে: `=SUMIF('লেনদেন'!C:C, A2, 'লেনদেন'!E:E)`। এতে ওই খাতের সব খরচ যোগ হয়ে আসে।
- মোট আয়: `=SUM('লেনদেন'!D:D)`। মোট খরচ: `=SUM('লেনদেন'!E:E)`।
- আপনার কম্পিউটারের আঞ্চলিক সেটিংয়ে ফর্মুলার ভেতরে কমার জায়গায় সেমিকোলন লাগলে কমাগুলো সেমিকোলন করে নিন।

**যে অভ্যাসে শিটটা টেকে**

- এন্ট্রি ওই দিনই লিখুন, এক মিনিটের কমে। তিন দিন বাদ গেলেই বেশিরভাগ হিসাব থেমে যায়।
- প্রতি মাসে একটা ট্যাব। নতুন মাসের শুরুতে ফাঁকা ট্যাবটা কপি করুন, আর আগের মাসের শেষ ব্যালেন্স হাতে বসিয়ে দিন।
- সারাংশের ট্যাবে চার্ট যোগ করুন এক মাসের আসল এন্ট্রি জমার পরে।

এই ধরনের শিট আমরা আপনার মাপে বানিয়ে দিই: আপনার নিজের খাত, প্রতি মাসে একটা ট্যাব, সারাংশ আর চার্ট, Excel বা Google Sheets-এ। দেখুন [স্প্রেডশিট সার্ভিস](/services/) আর [দামের তালিকা](/pricing/), অথবা [অনুরোধ পাঠান](/contact/?service=spreadsheet)।
