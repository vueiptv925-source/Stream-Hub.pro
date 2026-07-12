# Stream-Hub.pro — Render Deployment Guide

## الإعدادات المطلوبة للنشر على Render

### الخطوة 1: نوع الخدمة (Service Type)

| الإعداد | القيمة |
|---------|--------|
| Service Type | **Web Service** |
| Name | `stream-hub-pro` (أو أي اسم تفضله) |
| Runtime | **Node** |
| Region | اختر الأقرب لك (مثلاً `Frankfurt` للشرق الأوسط) |

---

### الخطوة 2: إعدادات البناء (Build Settings)

| الإعداد | القيمة |
|---------|--------|
| Branch | `main` |
| Build Command | `pnpm install && pnpm build` |
| Start Command | `node dist/index.js` |
| Node Version | `22.x` |
| Package Manager | `pnpm` |

---

### الخطوة 3: متغيرات البيئة (Environment Variables)

| المفتاح | القيمة |
|---------|--------|
| `NODE_ENV` | `production` |

---

### الخطوة 4: إعدادات إضافية

| الإعداد | القيمة |
|---------|--------|
| Root Directory | اتركه فارغاً (المستودع بالكامل) |
| Health Check Path | `/` (يعيد index.html) |
| Auto-Deploy | فعله ليكون التحديث تلقائياً عند كل push |

---

## خطوات النشر التفصيلية (خطوة بخطوة)

### الطريقة 1: عبر لوحة تحكم Render (الأفضل)

1. **سجل الدخول** إلى [dashboard.render.com](https://dashboard.render.com)
2. اضغط على **"New +"** ثم اختر **"Web Service"**
3. اربط المستودع: `vueiptv925-source/Stream-Hub.pro`
4. **الاسم:** `stream-hub-pro`
5. **البيئة (Environment):** اختر **Node**
6. **الأمر (Build Command):** `pnpm install && pnpm build`
7. **أمر التشغيل (Start Command):** `node dist/index.js`
8. اضغط **"Create Web Service"**
9. انتظر حتى يكتمل البناء (عادة 2-3 دقائق)
10. الموقع سيكون متاحاً على رابط مثل: `stream-hub-pro.onrender.com`

### الطريقة 2: عبر render.yaml (تلقائي)

المشروع يحتوي على ملف `render.yaml` جاهز. إذا ربطت المستودع بالـ Blueprint في Render، سيتم إنشاء الخدمة تلقائياً بكل الإعدادات.

---

## ملاحظات مهمة

- المشروع يعتمد على **pnpm** كـ Package Manager. تأكد من أن Render يدعم pnpm (يدعمه تلقائياً).
- الملف `dist/index.js` هو الـ server المبني بـ esbuild ويعمل على أي بيئة Node.js.
- الملفات الثابتة (الصور) مرفوعة على Manus Storage وستبقى تعمل بعد النشر.
- المشروع **static frontend** مع Express server لخدمة الملفات، لا يحتاج قاعدة بيانات.

---

## التحقق بعد النشر

بعد النشر، تحقق من هذه الروابط:
- `https://your-app.onrender.com/` → الصفحة الرئيسية
- `https://your-app.onrender.com/decoder` → فك الشفرات
- `https://your-app.onrender.com/providers` → قائمة المصادر
- `https://your-app.onrender.com/api-docs` → توثيق الـ API
