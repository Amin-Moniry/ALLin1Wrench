/* Evidence: owner README files and public source modules. See docs/PROJECT-SOURCES.md. */
window.REDLINE_PROJECTS = [
  {
    "id": "telebrief",
    "title": "TeleBrief",
    "category": "ai",
    "repo": "TeleBrief",
    "year": "2026",
    "subtitle": {
      "en": "Signal, not noise.",
      "fa": "سیگنال؛ نه هیاهو."
    },
    "summary": {
      "en": "A bilingual Telegram intelligence feed with a two-stage AI filtering pipeline.",
      "fa": "خوراک خبری دوزبانهٔ تلگرام با خط لولهٔ دو‌مرحله‌ای پالایش هوش مصنوعی."
    },
    "tags": [
      "Python",
      "Telethon",
      "LLM APIs"
    ],
    "cover": "telebrief-telebrief.webp",
    "mediaType": {
      "en": "Original repository artwork",
      "fa": "تصویر هویت پروژه از مخزن"
    },
    "live": "https://t.me/telebriefdata_bot",
    "challenge": {
      "en": "Keeping up with many Telegram channels creates a second problem: deciding what deserves attention. Repeated stories, low-value posts and changing formats make a raw feed difficult to use. TeleBrief turns that stream into source-linked, structured digests.",
      "fa": "دنبال‌کردن کانال‌های متعدد مسئلهٔ تازه‌ای می‌سازد: چه چیزی ارزش توجه دارد؟ خبرهای تکراری، پست‌های کم‌ارزش و قالب‌های متغیر خواندن خوراک خام را دشوار می‌کنند. TeleBrief این جریان را به گزارش‌های ساختاریافته با لینک منبع تبدیل می‌کند."
    },
    "approach": {
      "en": "The collection layer uses Telethon and MTProto. Messages are batched for a first-pass shortlist, then merged into a final report. The code separates digest generation from the command interface, which handles user preferences, report tasks and cancellation. Model fallbacks and deduplication make the pipeline less dependent on a single response.",
      "fa": "لایهٔ گردآوری از Telethon و MTProto استفاده می‌کند. پیام‌ها در دسته‌ها برای انتخاب اولیه پردازش و سپس در گزارش نهایی ادغام می‌شوند. کد، تولید گزارش را از رابط فرمان‌ها جدا کرده؛ تنظیمات کاربر، وظایف گزارش و لغو در لایهٔ رابط مدیریت می‌شوند. مسیر جایگزین مدل‌ها و حذف تکرار وابستگی به یک پاسخ را کاهش می‌دهند."
    },
    "features": [
      {
        "en": "English and Persian menus, commands and report text",
        "fa": "منوها، فرمان‌ها و متن گزارش فارسی و انگلیسی"
      },
      {
        "en": "Custom channels, categories and time windows",
        "fa": "کانال‌های سفارشی، دسته‌بندی و بازه‌های زمانی"
      },
      {
        "en": "Source links alongside summarized stories",
        "fa": "لینک منبع کنار خبرهای خلاصه‌شده"
      },
      {
        "en": "Model fallback, deduplication and cancellable report tasks",
        "fa": "مدل جایگزین، حذف تکرار و امکان لغو گزارش"
      }
    ],
    "nodes": [
      {
        "en": "Channels",
        "fa": "کانال‌ها"
      },
      {
        "en": "MTProto collection",
        "fa": "گردآوری MTProto"
      },
      {
        "en": "AI shortlist",
        "fa": "گزینش اولیه"
      },
      {
        "en": "Merge + deduplicate",
        "fa": "ادغام و حذف تکرار"
      },
      {
        "en": "EN / FA digest",
        "fa": "گزارش دوزبانه"
      }
    ],
    "constraint": {
      "en": "Access depends on Telegram sessions and channel visibility. Generated summaries still need source checking. This portfolio does not certify factual accuracy, throughput or the current uptime of the linked bot.",
      "fa": "دسترسی به نشست تلگرام و قابل‌مشاهده‌بودن کانال‌ها وابسته است. خلاصه‌های تولیدشده همچنان نیاز به بررسی منبع دارند. این پرتفوی دقت، ظرفیت پردازش یا وضعیت فعلی ربات را تضمین نمی‌کند."
    },
    "decision": {
      "en": "Separate collection, reasoning and presentation. A changing prompt should not require rewriting every Telegram command.",
      "fa": "گردآوری، استدلال و نمایش را جدا کن؛ تغییر پرامپت نباید بازنویسی تمام فرمان‌های تلگرام را لازم کند."
    },
    "files": [
      "digest_core.py",
      "command_bot.py",
      "localized_bot.py"
    ],
    "gallery": [
      "telebrief-telebrief.webp"
    ],
    "url": "https://github.com/Amin-Moniry/TeleBrief",
    "sources": [
      {
        "label": "README",
        "url": "https://github.com/Amin-Moniry/TeleBrief/blob/master/README.md"
      },
      {
        "label": "digest_core.py",
        "url": "https://github.com/Amin-Moniry/TeleBrief/blob/master/digest_core.py"
      },
      {
        "label": "command_bot.py",
        "url": "https://github.com/Amin-Moniry/TeleBrief/blob/master/command_bot.py"
      },
      {
        "label": "localized_bot.py",
        "url": "https://github.com/Amin-Moniry/TeleBrief/blob/master/localized_bot.py"
      }
    ]
  },
  {
    "id": "executive-bot",
    "title": "Executive Bot",
    "category": "automation",
    "repo": "n8n_ExecutiveBot_Platform",
    "year": "2025",
    "subtitle": {
      "en": "One conversation. Many tools.",
      "fa": "یک گفت‌وگو؛ ابزارهای متعدد."
    },
    "summary": {
      "en": "A self-hosted n8n assistant connecting Telegram, Google Workspace and multiple AI models.",
      "fa": "دستیار خودمیزبان n8n برای اتصال تلگرام، ابزارهای گوگل و چند مدل هوش مصنوعی."
    },
    "tags": [
      "n8n",
      "Docker",
      "Gemini",
      "Ollama"
    ],
    "cover": "n8n-workflow.webp",
    "mediaType": {
      "en": "Actual workflow screenshot · cropped from repository",
      "fa": "اسکرین‌شات واقعی گردش‌کار · برش تصویر مخزن"
    },
    "challenge": {
      "en": "Email, files, spreadsheets and AI tools usually live in separate interfaces. The goal here is to reach those tools from one Telegram conversation while keeping the orchestration self-hosted.",
      "fa": "ایمیل، فایل، صفحه‌گسترده و مدل‌های هوش مصنوعی معمولاً رابط‌های جداگانه دارند. هدف این پروژه دسترسی به آن‌ها در یک گفت‌وگوی تلگرام و حفظ میزبانی مستقل هماهنگ‌کننده است."
    },
    "approach": {
      "en": "The exported n8n workflow starts at a Telegram trigger and routes messages between two AI-agent branches. Gemini and Ollama nodes provide model options; PostgreSQL chat-memory nodes preserve context. Gmail, Drive and Sheets tool nodes sit behind the agent layer. Merge, filter and code nodes shape the reply before it returns to Telegram.",
      "fa": "گردش‌کار صادرشدهٔ n8n از تریگر تلگرام شروع می‌شود و پیام را میان دو مسیر عامل هوش مصنوعی هدایت می‌کند. Gemini و Ollama گزینه‌های مدل‌اند و حافظهٔ گفت‌وگوی PostgreSQL زمینه را نگه می‌دارد. ابزارهای Gmail، Drive و Sheets پشت لایهٔ عامل قرار دارند. گره‌های ادغام، فیلتر و کد، پاسخ را پیش از بازگشت به تلگرام آماده می‌کنند."
    },
    "features": [
      {
        "en": "Telegram input and output in a single workflow",
        "fa": "ورودی و خروجی تلگرام در یک گردش‌کار"
      },
      {
        "en": "Gmail reading and sending tool nodes",
        "fa": "گره‌های ابزار خواندن و ارسال Gmail"
      },
      {
        "en": "Google Drive and Sheets access",
        "fa": "دسترسی به Google Drive و Sheets"
      },
      {
        "en": "Dual AI-agent routing with persistent chat memory",
        "fa": "مسیریابی دو عامل با حافظهٔ ماندگار گفت‌وگو"
      }
    ],
    "nodes": [
      {
        "en": "Telegram trigger",
        "fa": "تریگر تلگرام"
      },
      {
        "en": "Message routing",
        "fa": "مسیریابی پیام"
      },
      {
        "en": "AI agents + memory",
        "fa": "عامل‌ها و حافظه"
      },
      {
        "en": "Workspace tools",
        "fa": "ابزارهای کاری"
      },
      {
        "en": "Formatted reply",
        "fa": "پاسخ قالب‌بندی‌شده"
      }
    ],
    "constraint": {
      "en": "The workflow export is not a ready-authenticated deployment. Google credentials, PostgreSQL and model services must be configured separately. External actions require appropriate permissions; no workspace tools run inside this portfolio.",
      "fa": "فایل گردش‌کار، استقرار احراز هویت‌شدهٔ آماده نیست. اعتبارنامه‌های گوگل، PostgreSQL و سرویس مدل باید جداگانه تنظیم شوند. عملیات بیرونی به مجوز مناسب نیاز دارد؛ هیچ ابزار کاری از داخل این پرتفوی اجرا نمی‌شود."
    },
    "decision": {
      "en": "Make the orchestration visible. A node-based workflow exposes routing, model choice and tool boundaries instead of hiding them in a monolithic bot.",
      "fa": "هماهنگ‌سازی را قابل‌مشاهده کن؛ گردش‌کار گره‌ای، مسیریابی، انتخاب مدل و مرز ابزارها را به‌جای پنهان‌کردن در یک ربات یکپارچه نشان می‌دهد."
    },
    "files": [
      "n8n_amin.json"
    ],
    "gallery": [
      "n8n-workflow.webp"
    ],
    "url": "https://github.com/Amin-Moniry/n8n_ExecutiveBot_Platform",
    "sources": [
      {
        "label": "README",
        "url": "https://github.com/Amin-Moniry/n8n_ExecutiveBot_Platform/blob/master/README.md"
      },
      {
        "label": "n8n_amin.json",
        "url": "https://github.com/Amin-Moniry/n8n_ExecutiveBot_Platform/blob/master/n8n_amin.json"
      }
    ]
  },
  {
    "id": "safevision",
    "title": "DetectSafeVisionX",
    "category": "vision",
    "repo": "DetectMultiObject-for-Helmets-Masks-Fire-Smoke-Smoking",
    "year": "2025",
    "subtitle": {
      "en": "Make hazards visible.",
      "fa": "خطر را قابل‌دیدن کن."
    },
    "summary": {
      "en": "YOLO-based safety detection for helmets, masks, smoking, fire and smoke, with a PyQt6 interface.",
      "fa": "تشخیص ایمنی مبتنی بر YOLO برای کلاه، ماسک، سیگار، آتش و دود با رابط PyQt6."
    },
    "tags": [
      "YOLO",
      "OpenCV",
      "PyQt6"
    ],
    "cover": "vision-amin2.webp",
    "mediaType": {
      "en": "Actual detection example from repository",
      "fa": "نمونهٔ واقعی خروجی تشخیص از مخزن"
    },
    "challenge": {
      "en": "A video feed is useful only if an operator can act on it. This project brings model predictions, visual overlays and camera controls into a desktop interface for safety-monitoring experiments. The README also names the application P8GP-G01.",
      "fa": "ویدئو زمانی مفید است که اپراتور بتواند از آن استفاده کند. این پروژه پیش‌بینی مدل، نشانه‌گذاری تصویر و کنترل دوربین را در یک رابط دسکتاپ برای آزمایش‌های پایش ایمنی جمع می‌کند. نام برنامه در README، P8GP-G01 نیز ذکر شده است."
    },
    "approach": {
      "en": "CameraManager isolates capture and source selection. DetectionEngine loads Ultralytics YOLO models, filters predictions by confidence and draws bounding boxes. Dedicated UI modules cover controls, dashboards, notifications and video playback. This separation keeps model inference apart from the interface.",
      "fa": "CameraManager دریافت تصویر و انتخاب منبع را جدا می‌کند. DetectionEngine مدل‌های Ultralytics YOLO را بارگذاری، پیش‌بینی‌ها را با آستانهٔ اطمینان پالایش و کادرهای تشخیص را رسم می‌کند. ماژول‌های رابط، کنترل‌ها، داشبورد، اعلان و پخش ویدئو را پوشش می‌دهند. این تفکیک، استنتاج مدل را از رابط جدا نگه می‌دارد."
    },
    "features": [
      {
        "en": "Five safety-related detection categories",
        "fa": "پنج دستهٔ تشخیص مرتبط با ایمنی"
      },
      {
        "en": "Camera and video-source controls",
        "fa": "کنترل دوربین و منبع ویدئو"
      },
      {
        "en": "Confidence filtering and visual bounding boxes",
        "fa": "فیلتر اطمینان و کادرهای تصویری تشخیص"
      },
      {
        "en": "Desktop dashboard and automatic image saving",
        "fa": "داشبورد دسکتاپ و ذخیرهٔ خودکار تصویر"
      }
    ],
    "nodes": [
      {
        "en": "Camera / video",
        "fa": "دوربین / ویدئو"
      },
      {
        "en": "OpenCV frames",
        "fa": "فریم‌های OpenCV"
      },
      {
        "en": "YOLO inference",
        "fa": "استنتاج YOLO"
      },
      {
        "en": "Confidence filter",
        "fa": "فیلتر اطمینان"
      },
      {
        "en": "Overlay + dashboard",
        "fa": "نشانه‌گذاری و داشبورد"
      }
    ],
    "constraint": {
      "en": "A model prediction is not a safety guarantee. Accuracy depends on training data, lighting, camera angle and hardware. This is not presented as a certified fire alarm or a replacement for human supervision.",
      "fa": "پیش‌بینی مدل تضمین ایمنی نیست. دقت به دادهٔ آموزشی، نور، زاویهٔ دوربین و سخت‌افزار وابسته است. این پروژه به‌عنوان سامانهٔ اعلام حریق تأییدشده یا جایگزین نظارت انسانی معرفی نمی‌شود."
    },
    "decision": {
      "en": "Keep camera access and inference behind separate modules so the UI can change without changing detection logic.",
      "fa": "دسترسی دوربین و استنتاج را پشت ماژول‌های جدا نگه دار تا تغییر رابط، منطق تشخیص را تغییر ندهد."
    },
    "files": [
      "Codes/DetectionEngine.py",
      "Codes/CameraManager.py",
      "Codes/Dashboard.py"
    ],
    "gallery": [
      "vision-amin1.webp",
      "vision-amin2.webp"
    ],
    "url": "https://github.com/Amin-Moniry/DetectMultiObject-for-Helmets-Masks-Fire-Smoke-Smoking",
    "sources": [
      {
        "label": "README",
        "url": "https://github.com/Amin-Moniry/DetectMultiObject-for-Helmets-Masks-Fire-Smoke-Smoking/blob/master/README.md"
      },
      {
        "label": "Codes/DetectionEngine.py",
        "url": "https://github.com/Amin-Moniry/DetectMultiObject-for-Helmets-Masks-Fire-Smoke-Smoking/blob/master/Codes/DetectionEngine.py"
      },
      {
        "label": "Codes/CameraManager.py",
        "url": "https://github.com/Amin-Moniry/DetectMultiObject-for-Helmets-Masks-Fire-Smoke-Smoking/blob/master/Codes/CameraManager.py"
      },
      {
        "label": "Codes/Dashboard.py",
        "url": "https://github.com/Amin-Moniry/DetectMultiObject-for-Helmets-Masks-Fire-Smoke-Smoking/blob/master/Codes/Dashboard.py"
      }
    ]
  },
  {
    "id": "botam",
    "title": "BotAM",
    "category": "automation",
    "repo": "BotAM",
    "year": "2025",
    "subtitle": {
      "en": "Across languages. Beyond one engine.",
      "fa": "میان زبان‌ها؛ فراتر از یک موتور."
    },
    "summary": {
      "en": "A Persian-friendly Telegram translator with automatic language detection and multiple translation engines.",
      "fa": "مترجم تلگرامی فارسی‌پسند با تشخیص خودکار زبان و چند موتور ترجمه."
    },
    "tags": [
      "Python",
      "Telegram Bot API",
      "Translation"
    ],
    "cover": null,
    "mediaType": {
      "en": "Editorial architecture diagram · not an app screenshot",
      "fa": "نمودار تحریریهٔ معماری · نه اسکرین‌شات برنامه"
    },
    "live": "https://t.me/translator7adc7aminbot",
    "challenge": {
      "en": "Translation can fail because an engine is unavailable, not because the user’s text is unusual. BotAM gives users a familiar Telegram interface and a translation path that can try alternative providers.",
      "fa": "ترجمه ممکن است به‌دلیل در دسترس نبودن موتور شکست بخورد، نه به‌دلیل متن کاربر. BotAM رابط آشنای تلگرام و مسیری ارائه می‌کند که بتواند سرویس‌های جایگزین را امتحان کند."
    },
    "approach": {
      "en": "The SuperTranslator class combines pattern-based script detection with provider calls. Google, Bing, Yandex and Baidu are represented in the translation implementation. Telegram handlers manage source and target language selection. A JSON-backed Database class stores user statistics and translation history; this is not a SQL-backed service.",
      "fa": "کلاس SuperTranslator تشخیص الگوی نوشتار را با فراخوانی سرویس‌ها ترکیب می‌کند. Google، Bing، Yandex و Baidu در پیاده‌سازی ترجمه حضور دارند. هندلرهای تلگرام انتخاب زبان مبدأ و مقصد را مدیریت می‌کنند. کلاس Database مبتنی بر JSON، آمار کاربر و تاریخچهٔ ترجمه را ذخیره می‌کند؛ این سرویس مبتنی بر SQL نیست."
    },
    "features": [
      {
        "en": "Automatic source-language detection",
        "fa": "تشخیص خودکار زبان مبدأ"
      },
      {
        "en": "Multiple providers and fallback attempts",
        "fa": "چند ارائه‌دهنده و تلاش با مسیر جایگزین"
      },
      {
        "en": "Persian-friendly language-selection menus",
        "fa": "منوهای انتخاب زبان سازگار با فارسی"
      },
      {
        "en": "Personal history, statistics and level progression",
        "fa": "تاریخچه، آمار و پیشرفت سطح کاربر"
      }
    ],
    "nodes": [
      {
        "en": "User text",
        "fa": "متن کاربر"
      },
      {
        "en": "Language detection",
        "fa": "تشخیص زبان"
      },
      {
        "en": "Provider chain",
        "fa": "زنجیرهٔ ارائه‌دهنده"
      },
      {
        "en": "Translation result",
        "fa": "نتیجهٔ ترجمه"
      },
      {
        "en": "History + response",
        "fa": "تاریخچه و پاسخ"
      }
    ],
    "constraint": {
      "en": "Provider availability and translation quality vary. The README describes 15+ languages, but this portfolio does not promise a fixed response time or 24/7 uptime. No translation request is sent from the visual diagram.",
      "fa": "دسترسی سرویس و کیفیت ترجمه متغیر است. README از بیش از ۱۵ زبان می‌گوید، اما این پرتفوی زمان پاسخ ثابت یا پایداری شبانه‌روزی را وعده نمی‌دهد. نمودار بصری هیچ درخواست ترجمه‌ای ارسال نمی‌کند."
    },
    "decision": {
      "en": "Treat provider failure as a recoverable condition. Keep the user’s language choice and history separate from translation-engine selection.",
      "fa": "خرابی سرویس را وضعیتی قابل‌بازیابی بدان؛ انتخاب زبان و تاریخچهٔ کاربر را از انتخاب موتور ترجمه جدا نگه دار."
    },
    "files": [
      "bot.py",
      "requirements.txt"
    ],
    "gallery": [],
    "url": "https://github.com/Amin-Moniry/BotAM",
    "sources": [
      {
        "label": "README",
        "url": "https://github.com/Amin-Moniry/BotAM/blob/master/README.md"
      },
      {
        "label": "bot.py",
        "url": "https://github.com/Amin-Moniry/BotAM/blob/master/bot.py"
      },
      {
        "label": "requirements.txt",
        "url": "https://github.com/Amin-Moniry/BotAM/blob/master/requirements.txt"
      }
    ]
  },
  {
    "id": "3d-visualizer",
    "title": "3D Visualizer",
    "category": "web",
    "repo": "3D_Visualizer",
    "year": "2026",
    "subtitle": {
      "en": "Inspect. Orbit. Explore.",
      "fa": "بررسی کن؛ بچرخان؛ کشف کن."
    },
    "summary": {
      "en": "A portable Three.js model inspector for GLB / GLTF assets, bundled into a standalone HTML file.",
      "fa": "بازرس قابل‌حمل مدل‌های GLB و GLTF با Three.js، بسته‌بندی‌شده در یک فایل HTML مستقل."
    },
    "tags": [
      "Three.js",
      "GLTFLoader",
      "WebGL"
    ],
    "cover": "visualizer-carmodeltest.webp",
    "mediaType": {
      "en": "Actual model-viewer screenshot from repository",
      "fa": "اسکرین‌شات واقعی نمایشگر مدل از مخزن"
    },
    "challenge": {
      "en": "Reviewing a 3D asset should not always require installing a full creative suite. This project packages model loading, inspection and screenshot export into a browser-based tool that can be carried as one HTML file.",
      "fa": "بررسی مدل سه‌بعدی نباید همیشه به نصب مجموعه‌ای سنگین نیاز داشته باشد. این پروژه بارگذاری، بررسی و خروجی تصویر را در ابزاری مرورگرمحور جمع می‌کند که در قالب یک فایل HTML قابل‌حمل است."
    },
    "approach": {
      "en": "Three.js renders the scene; GLTFLoader imports models and OrbitControls handles navigation. The template separates model layout, focus, lighting, animation selection and export functions. A Python build step injects local JavaScript libraries to produce the standalone file. Bundled dependencies are different from having no libraries at all.",
      "fa": "Three.js صحنه را رندر می‌کند؛ GLTFLoader مدل‌ها را وارد و OrbitControls ناوبری را مدیریت می‌کند. قالب، چیدمان مدل، فوکوس، نور، انتخاب انیمیشن و خروجی را به توابع جدا تقسیم کرده است. مرحلهٔ ساخت پایتون کتابخانه‌های محلی جاوااسکریپت را داخل فایل مستقل قرار می‌دهد. بسته‌بندی وابستگی‌ها با نداشتن کتابخانه متفاوت است."
    },
    "features": [
      {
        "en": "Import up to seven GLB / GLTF models",
        "fa": "ورود هم‌زمان تا هفت مدل GLB یا GLTF"
      },
      {
        "en": "Orbit navigation and click-to-focus",
        "fa": "چرخش پیرامون مدل و فوکوس با کلیک"
      },
      {
        "en": "Animation playback and lighting presets",
        "fa": "پخش انیمیشن و تنظیمات آمادهٔ نور"
      },
      {
        "en": "Screenshot export and offline standalone build",
        "fa": "خروجی اسکرین‌شات و ساخت مستقل آفلاین"
      }
    ],
    "nodes": [
      {
        "en": "GLB / GLTF asset",
        "fa": "فایل GLB / GLTF"
      },
      {
        "en": "GLTFLoader",
        "fa": "GLTFLoader"
      },
      {
        "en": "Three.js scene",
        "fa": "صحنهٔ Three.js"
      },
      {
        "en": "Orbit + animation",
        "fa": "چرخش و انیمیشن"
      },
      {
        "en": "Inspect / export",
        "fa": "بررسی / خروجی"
      }
    ],
    "constraint": {
      "en": "WebGL support, asset size and device memory affect the experience. External textures in some GLTF files need appropriate packaging. The portfolio links to the source rather than pretending to host the full viewer.",
      "fa": "پشتیبانی WebGL، اندازهٔ مدل و حافظهٔ دستگاه بر تجربه اثر دارند. تکسچرهای بیرونی برخی فایل‌های GLTF به بسته‌بندی مناسب نیاز دارند. پرتفوی به منبع لینک می‌دهد و ادعای میزبانی نمایشگر کامل را ندارد."
    },
    "decision": {
      "en": "Make the delivery portable: inline the rendering libraries at build time while keeping the source template readable.",
      "fa": "خروجی را قابل‌حمل کن؛ کتابخانه‌های رندر را هنگام ساخت داخل فایل قرار بده، اما قالب منبع را خوانا نگه دار."
    },
    "files": [
      "universal_template.html",
      "build_viewer.py"
    ],
    "gallery": [
      "visualizer-carmodeltest.webp",
      "visualizer-main.webp"
    ],
    "url": "https://github.com/Amin-Moniry/3D_Visualizer",
    "sources": [
      {
        "label": "README",
        "url": "https://github.com/Amin-Moniry/3D_Visualizer/blob/master/README.md"
      },
      {
        "label": "universal_template.html",
        "url": "https://github.com/Amin-Moniry/3D_Visualizer/blob/master/universal_template.html"
      },
      {
        "label": "build_viewer.py",
        "url": "https://github.com/Amin-Moniry/3D_Visualizer/blob/master/build_viewer.py"
      }
    ]
  }
];
