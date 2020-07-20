use DrivingTrainingCenter;

-- ================================================
-- insert into vehicles
-- ================================================
INSERT INTO vehicles(name,license_type,plate,color,created_at,updated_at) VALUES 
	(N'پراید', N'پایه ۳',N'ایران ۲۱ 10-ن-752',N'زرد',GETDATE(),GETDATE()),
	(N'پژو', N'پایه ۳',N'ایران ۲۱ 10-ن-722',N'آبی',GETDATE(),GETDATE()),
	(N'پراید', N'پایه ۳',N'ایران ۲۱ 10-ن-732',N'قرمز',GETDATE(),GETDATE());

-- ================================================
-- insert into schedules
-- ================================================
INSERT INTO schedules(day,[from],until,created_at,updated_at) VALUES 
	(N'شنبه','08:00','10:00',GETDATE(),GETDATE()),
	(N'یکشنبه','08:00','10:00',GETDATE(),GETDATE()),
	(N'دوشنبه','08:00','10:00',GETDATE(),GETDATE()),
	(N'سه‌شنبه','08:00','10:00',GETDATE(),GETDATE()),
	(N'چهارشنبه','08:00','10:00',GETDATE(),GETDATE()),
	(N'شنبه','10:00','12:00',GETDATE(),GETDATE()),
	(N'یکشنبه','10:00','12:00',GETDATE(),GETDATE()),
	(N'دوشنبه','10:00','12:00',GETDATE(),GETDATE()),
	(N'سه‌شنبه','10:00','12:00',GETDATE(),GETDATE()),
	(N'چهارشنبه','10:00','12:00',GETDATE(),GETDATE()),
	(N'شنبه','12:00','14:00',GETDATE(),GETDATE()),
	(N'یکشنبه','12:00','14:00',GETDATE(),GETDATE()),
	(N'دوشنبه','12:00','14:00',GETDATE(),GETDATE()),
	(N'سه‌شنبه','12:00','14:00',GETDATE(),GETDATE()),
	(N'چهارشنبه','12:00','14:00',GETDATE(),GETDATE()),
	(N'شنبه','14:00','16:00',GETDATE(),GETDATE()),
	(N'یکشنبه','14:00','16:00',GETDATE(),GETDATE()),
	(N'دوشنبه','14:00','16:00',GETDATE(),GETDATE()),
	(N'سه‌شنبه','14:00','16:00',GETDATE(),GETDATE()),
	(N'چهارشنبه','14:00','16:00',GETDATE(),GETDATE()),
	(N'شنبه','16:00','18:00',GETDATE(),GETDATE()),
	(N'یکشنبه','16:00','18:00',GETDATE(),GETDATE()),
	(N'دوشنبه','16:00','18:00',GETDATE(),GETDATE()),
	(N'سه‌شنبه','16:00','18:00',GETDATE(),GETDATE()),
	(N'چهارشنبه','16:00','18:00',GETDATE(),GETDATE());

-- ================================================
-- insert into licenses
-- ================================================
INSERT INTO licenses(name,cost,conditions,created_at,updated_at) VALUES 
	(N'موتورسیکلت', 500000,N'["سن 18 سال تمام.","گواهي سلامت جسمي و روحي و رواني و تست عدم اعتياد."]',GETDATE(),GETDATE()),
	(N'پایه ۱', 1200000,N'["سن 25 سال تمام.","گذشت 2 سال تمام از اخذ گواهينامه پايه دوم.","گواهي سلامت جسمي و روحي و رواني و تست عدم اعتياد."]',GETDATE(),GETDATE()),
	(N'پایه 2', 900000,N'["سن 23 سال تمام.","گذشت 2 سال تمام از اخذ گواهينامه پايه سوم.","گواهي سلامت جسمي و روحي و رواني و تست عدم اعتياد."]',GETDATE(),GETDATE()),
	(N'پایه 3', 800000,N'["سن 18 سال تمام.","گواهي سلامت جسمي و روحي و رواني و تست عدم اعتياد."]',GETDATE(),GETDATE());

-- ================================================
-- insert into applicants
-- ================================================
INSERT INTO applicants(first_name,last_name,gender,national_code,birthdate,password,phone,education,postal_code,status,father_name,blood_type,created_at,updated_at) VALUES 
(N'منوچهر',N'احمدی',N'مرد','0016369891',GETDATE(),HASHBYTES('MD5', '12345'),'09121080282',N'لیسانس','1523659862','PENDING',N'ابوالفضل','O+',GETDATE(),GETDATE()),
(N'زهرا',N'نعمتی',N'زن','0016230561',GETDATE(),HASHBYTES('MD5', '12345'),'09192563252',N'دیپلم','9623699699','PENDING',N'ناصر','B-',GETDATE(),GETDATE()),
(N'همایون',N'شجریان',N'زن','0011259891',GETDATE(),HASHBYTES('MD5', '12345'),'0911569852',N'فوق لیسانس','1126999855','PENDING',N'حمید','A+',GETDATE(),GETDATE());

-- ================================================
-- insert into payments
-- ================================================
INSERT INTO payments(applicant_id,license_id,status,created_at,updated_at) VALUES 
	(1,2,'PAYED',GETDATE(),GETDATE()),
	(2,1,'PAYED',GETDATE(),GETDATE()),
	(3,3,'PENDING',GETDATE(),GETDATE());

-- ================================================
-- insert into staffs
-- ================================================
INSERT INTO staffs(first_name,last_name,gender,national_code,birthdate,password,phone,role,salary,created_at,updated_at) VALUES 
(N'رحیم',N'نوروزی',N'مرد','0018920201',GETDATE(),HASHBYTES('MD5', '12345'),'09121080282',N'نویسنده','3500000',GETDATE(),GETDATE()),
(N'حسن',N'باقری',N'مرد','0012563021',GETDATE(),HASHBYTES('MD5', '12345'),'09192563252',N'نویسنده','5000000',GETDATE(),GETDATE()),
(N'نسرین',N'ستوده',N'زن','0017452021',GETDATE(),HASHBYTES('MD5', '12345'),'0911569852',N'نویسنده','2500000',GETDATE(),GETDATE());

-- ================================================
-- insert into officers
-- ================================================
INSERT INTO officers(first_name,last_name,national_code,birthdate,phone,salary,degree,license_type,created_at,updated_at) VALUES 
(N'رحیم',N'نوروزی','00152636501',GETDATE(),'09121080282','3500000',N'سرهنگ',N'پایه ۱',GETDATE(),GETDATE()),
(N'حسن',N'باقری','0016699331',GETDATE(),'09192563252','5000000',N'ستوان',N'پایه 2',GETDATE(),GETDATE()),
(N'حمید',N'افشاریان','0015566991',GETDATE(),'0911569852','2500000',N'سرهنگ',N'پایه 3',GETDATE(),GETDATE());

-- ================================================
-- insert into teachers
-- ================================================
INSERT INTO teachers(first_name,last_name,gender,national_code,birthdate,license_type,phone,description,salary,created_at,updated_at) VALUES 
(N'احسان',N'حسینی',N'مرد','0012564641',GETDATE(),N'پایه ۳','09121080282',N'دارای گواهی تدریس بین المللی','3500000',GETDATE(),GETDATE()),
(N'یوسف',N'رحیمی',N'مرد','00111220051',GETDATE(),N'پایه ۲','09192563252',N'۲۰ سال سابقه ی تدریس','5000000',GETDATE(),GETDATE()),
(N'مریم',N'فرشچی',N'زن','00112365221',GETDATE(),N'پایه ۱','0911569852',N'دارای مدرک حرفه ای','2500000',GETDATE(),GETDATE());

-- ================================================
-- insert into schedule_teachers
-- ================================================
INSERT INTO schedule_teachers(schedule_id,teacher_id,status,created_at,updated_at) VALUES 
	(1,1,'NULL',GETDATE(),GETDATE()),
	(2,1,'NULL',GETDATE(),GETDATE()),
	(3,1,'NULL',GETDATE(),GETDATE()),
	(4,1,'NULL',GETDATE(),GETDATE()),
	(5,1,'NULL',GETDATE(),GETDATE()),
	(6,1,'NULL',GETDATE(),GETDATE()),
	(12,1,'NULL',GETDATE(),GETDATE()),
	(13,1,'NULL',GETDATE(),GETDATE()),
	(14,1,'NULL',GETDATE(),GETDATE()),
	(15,1,'NULL',GETDATE(),GETDATE()),
	(16,1,'NULL',GETDATE(),GETDATE()),
	(17,1,'NULL',GETDATE(),GETDATE()),
	(1,2,'NULL',GETDATE(),GETDATE()),
	(7,2,'NULL',GETDATE(),GETDATE()),
	(8,2,'NULL',GETDATE(),GETDATE()),
	(12,2,'NULL',GETDATE(),GETDATE()),
	(13,2,'NULL',GETDATE(),GETDATE()),
	(15,2,'NULL',GETDATE(),GETDATE()),
	(16,2,'NULL',GETDATE(),GETDATE()),
	(17,2,'NULL',GETDATE(),GETDATE()),
	(18,2,'NULL',GETDATE(),GETDATE()),
	(23,2,'NULL',GETDATE(),GETDATE()),
	(24,2,'NULL',GETDATE(),GETDATE()),
	(25,3,'NULL',GETDATE(),GETDATE()),
	(24,3,'NULL',GETDATE(),GETDATE()),
	(23,3,'NULL',GETDATE(),GETDATE()),
	(20,3,'NULL',GETDATE(),GETDATE()),
	(19,3,'NULL',GETDATE(),GETDATE()),
	(18,3,'NULL',GETDATE(),GETDATE()),
	(17,3,'NULL',GETDATE(),GETDATE()),
	(16,3,'NULL',GETDATE(),GETDATE()),
	(11,3,'NULL',GETDATE(),GETDATE()),
	(10,3,'NULL',GETDATE(),GETDATE()),
	(9,3,'NULL',GETDATE(),GETDATE());

-- ================================================
-- insert into practical_courses
-- ================================================
INSERT INTO practical_courses(applicant_id,teacher_id,total_sessions,start_date,license_type,created_at,updated_at) VALUES 
	(1,2,10,GETDATE(),N'پایه ۱',GETDATE(),GETDATE()),
	(2,1,20,GETDATE(),N'پایه 2',GETDATE(),GETDATE()),
	(3,2,15,GETDATE(),N'پایه 3',GETDATE(),GETDATE());

-- ================================================
-- insert into schedule_practical_courses
-- ================================================
INSERT INTO schedule_practical_courses(practical_course_id,schedule_id,status,created_at,updated_at) VALUES 
	(1,2,'ACTIVE',GETDATE(),GETDATE()),
	(2,1,'ACTIVE',GETDATE(),GETDATE()),
	(3,2,'ACTIVE',GETDATE(),GETDATE());

-- ================================================
-- insert into sessions
-- ================================================
INSERT INTO sessions(practical_course_id,date,description,street,zone,vehicle_id,attendance,created_at,updated_at) VALUES 
	(1,GETDATE(),N'ندارد',N'گلها',N'گلها',1,1,GETDATE(),GETDATE()),
	(2,GETDATE(),N'ندارد',N'گلها',N'گلها',1,1,GETDATE(),GETDATE()),
	(3,GETDATE(),N'ندارد',N'گلها',N'گلها',1,1,GETDATE(),GETDATE());

-- ================================================
-- insert into practicalExams
-- ================================================
INSERT INTO practicalExams(applicant_id,officer_id,vehicle_id,date,license_type,status,created_at,updated_at) VALUES 
	(1,2,2,GETDATE(),N'پایه ۱','ACTIVE',GETDATE(),GETDATE()),
	(2,1,3,GETDATE(),N'پایه 2','ACTIVE',GETDATE(),GETDATE()),
	(3,2,1,GETDATE(),N'پایه 3','ACTIVE',GETDATE(),GETDATE());

-- ================================================
-- insert into theory_exams
-- ================================================
INSERT INTO theory_exams(license_type,questions_count,time,description,staff_id,created_at,updated_at) VALUES 
	(N'پایه ۱',20,N'30 دقیقه',N'امتحان به صورت تستی است و امکان بازگشت به عقب وجود دارد',1,GETDATE(),GETDATE()),
	(N'پایه ۲',30,N'50 دقیقه',N'امتحان به صورت تستی است و امکان بازگشت به عقب وجود دارد',2,GETDATE(),GETDATE()),
	(N'پایه ۳',15,N'20 دقیقه',N'امتحان به صورت تستی است و امکان بازگشت به عقب وجود دارد',3,GETDATE(),GETDATE());

-- ================================================
-- insert into questions
-- ================================================
INSERT INTO questions(title,options,correct_answer,theory_exam_id,created_at,updated_at) VALUES 
	(N'کدام گزینه صحیح است؟',N'["گزینه ۱","گزینه ۲","گزینه ۳","گزینه ۴"]',2,1,GETDATE(),GETDATE()),
	(N'کدام گزینه صحیح نیست؟',N'["گزینه ۱","گزینه ۲","گزینه ۳","گزینه ۴"]',3,2,GETDATE(),GETDATE()),
	(N'کدام عبارت صحیح است؟',N'["گزینه ۱","گزینه ۲","گزینه ۳","گزینه ۴"]',4,3,GETDATE(),GETDATE());

-- ================================================
-- insert into applicant_theory_exams
-- ================================================
INSERT INTO applicant_theory_exams(applicant_id,point,theory_exam_id,status,created_at,updated_at) VALUES 
	(1,20,1,N'قبول',GETDATE(),GETDATE()),
	(2,15,2,N'قبول',GETDATE(),GETDATE()),
	(3,8,2,N'رد',GETDATE(),GETDATE());

-- ================================================
-- insert into theory_courses
-- ================================================
INSERT INTO theory_courses(title,license_type,staff_id,created_at,updated_at) VALUES 
	(N'آموزش سطح ۰ آیین نامه ی پایه ۱',N'پایه ۱',1,GETDATE(),GETDATE()),
	(N'آموزش سطح 0 آیین نامه ی پایه 2',N'پایه 2',1,GETDATE(),GETDATE()),
	(N'آموزش سطح 0 آیین نامه ی پایه 3',N'پایه 3',2,GETDATE(),GETDATE());

-- ================================================
-- insert into lessons
-- ================================================
INSERT INTO lessons(title,content,theory_course_id,created_at,updated_at) VALUES 
	(N'عنوان درس نامه ۱', N'متن درسنامه 1',1,GETDATE(),GETDATE()),
	(N'عنوان درس نامه 2', N'متن درسنامه 2',2,GETDATE(),GETDATE()),
	(N'عنوان درس نامه 3', N'متن درسنامه 3',3,GETDATE(),GETDATE());

-- ================================================
-- insert into news
-- ================================================
INSERT INTO news (created_at,updated_at,title,content,slide,staff_id) VALUES 
	(GETDATE(),GETDATE(),N'تعطیلی فعالیت تا پایان فروردین۹۹', N'هنرجویان گرامی طبق بخشنامه ستاد ملی مبارزه با ویروس کرونا،آموزشگاههای رانندگی را در سراسر کشور جزو  مشاغل پر خطر (با ریسک بالا) اعلام نموده لذا فعالیت آموزشگاهها تا 30 فروردین 99 تعطیل می باشد',1,2),
	(GETDATE(),GETDATE(),N'عیب یابی خودرو',N'1  تک کارکردن خودرو در دور آرام و درجا 2  افزایش مصرف 3  بد روشن شدن خودرو 4  شتاب ضعیف و کشش کم 5  بالارفتن دمای آب نکته : دوده سیاه روی شمع : مصرف زیاد ش دوده سیاه چرب : روغن سوزی - دوده سیاه خشک : مپ سنسور و اکسیژن سنسور بررسی گردد',0,3),
	(GETDATE(),GETDATE(),N'دلیل روشن نشدن خودرو درفصل سرما',N'دلیل روشن نشدن خودرو درفصل سرما با فرا رسیدن فصل سرما و کاهش دما، روشن کردن خودرو برای برخی افراد به خصوص افرادی که در مناطق سردسیر زندگی میکنند، به مسئله ای بغرنج تبدیل میشود؛ چرا که در بیشتر مواقع اتومبیل به سختی روشن میشود. اما آیا میدانید علت این مشکل چه میتواند باشد؟ با ما همراه باشید تا به بررسی علل دیر روشن شدن خودرو در آب و هوای سرد بپردازیم: دلیل اول: در سرما میزان تبخیر بنزین همانند دیگر مایعات کاهش پیدا میکند. از آنجایی که برای احتراق بنزین و روشن شدن موتور، ابتدا باید بنزین تبخیر شود، پس در هوای سرد این اتفاق با تاخیر روی میدهد. به همین دلیل است که در چنین شرایطی برخی افراد داخل موتور خودرو اتر اسپری میکنند؛ چرا که اتر زودتر از بنزین تبخیر میشود و در نتیجه احتراق زودتر اتفاق میافتد.',1,2),
	(GETDATE(),GETDATE(),N'سیر تکامل خودرو از ابتدا تا امروز',N'سیرتکامل خودرو از ابتدا تا امروز پس از حمد و ثنای خداوند که نام شریفش دوای دردها و ذکر او شفای آلام و آرامش دلها و طاعتش موجب استغنای انسانهاست. بشر از چند هزار سال پیش با کمک تفکر و تلاش خود روشهائی را برای حمل و نقل و مایحتاج روزانه خود ابداع نمود که بتواند بارهای سنگین و حجیم را با سرعت و سهولت بیشتر جابه جا نماید که این مهم منجر به اختراع چرخ گردید این پدیده باعث دگرگونی در زندگی انسانهای اولیه شد که پس از آن به ارابه و گاری و دلیجان تکمیل گردید. تمدن های باستان و لشگرکشی های عظیم پادشاهان و امپراطوران برای حمل تجهیزات جنگی و مایهتاج سپاهیان به کمک این وسیله یعنی چرخ صورت می گرفته که این ابزار راه تکامل بسیار دشواری را گذرانده که امروز در خدمت حمل و نقل و آسایش انسانها در تمام دنیا قرار گرفته است. بعد از اختراع اولین اتومبیل در سال 1771 در فرانسه که با نیروی بخار کار میکرد اتومبیل امروزی حاصل نبوغ و تلاش هزاران مخترع و مبتکر و صنعتگر که با صرف وقت و انرژی فراوان قطعات و سیستم های با دوام و قابل اطمینان امروزی رسانیده اند در آغاز اتومبیل یک وسیله بی خطر در خدمت جامعه به حساب می آمده که با سیر تکامل آن و افزایش سرعت و عدم آگاهی افراد به چگونگی استفاده از این وسیله نقلیه مفید به ابزار مخرب و ضایعه آفرین تبدیل که امروزه متاسفانه بلای جان انسانها گردیده که همگان بر آن آگاهند. با افزایش سرعت و تکمیل اتومبیل تصادف هم بعنوان یک همزاد شوم با آن متولد شد که با کمال تاسف کشور عزیز ما هم از نظر تصادف جز بالاترین رتبه بحساب می آید. همه ساله هزاران نفر از نیروی فعال کشور از اقشار مختلف از جوانان و سرپرست خانواده ها حتی از نخبگان مردم در حوادث درون شهری وبرون شهری جان خود را از دست داده و در این راستا خسارت مادی و معنوی زیادی به خانواده و اقتصاد کشور و سرمایه های ملی وارد می سازد.',1,1);

-- ================================================
-- insert into categories
-- ================================================
INSERT INTO categories (created_at,updated_at,name) VALUES 
	(GETDATE(),GETDATE(),N'موتورسیکلت'),
	(GETDATE(),GETDATE(),N'پایه ۲'),
	(GETDATE(),GETDATE(),N'پایه ۳'),
	(GETDATE(),GETDATE(),N'پایه ۱');

-- ================================================
-- insert into category_news
-- ================================================
INSERT INTO category_news(created_at,updated_at,category_id,news_id) VALUES 
	(GETDATE(),GETDATE(),1,1),
	(GETDATE(),GETDATE(),1,2),
	(GETDATE(),GETDATE(),2,3),
	(GETDATE(),GETDATE(),3,2),
	(GETDATE(),GETDATE(),4,1),
	(GETDATE(),GETDATE(),4,4);

-- ================================================
-- insert into images
-- ================================================
INSERT INTO images(created_at,updated_at,name,imageable_id,imageable_type) VALUES 
	(GETDATE(),GETDATE(),'staff-01.png',1,'Staff'),
	(GETDATE(),GETDATE(),'staff-02.png',2,'Staff'),
	(GETDATE(),GETDATE(),'staff-03.png',3,'Staff'),
	(GETDATE(),GETDATE(),'applicant-01.png',1,'Applicant'),
	(GETDATE(),GETDATE(),'applicant-02.png',2,'Applicant'),
	(GETDATE(),GETDATE(),'applicant-03.png',3,'Applicant'),
	(GETDATE(),GETDATE(),'national-card-01.png',1,'National_Card'),
	(GETDATE(),GETDATE(),'national-card-02.png',2,'National_Card'),
	(GETDATE(),GETDATE(),'national-card-03.png',3,'National_Card'),
	(GETDATE(),GETDATE(),'officer-01.png',1,'Officer'),
	(GETDATE(),GETDATE(),'officer-02.png',2,'Officer'),
	(GETDATE(),GETDATE(),'officer-03.png',3,'Officer'),
	(GETDATE(),GETDATE(),'teacher-01.png',1,'Teacher'),
	(GETDATE(),GETDATE(),'teacher-02.png',2,'Teacher'),
	(GETDATE(),GETDATE(),'teacher-03.png',3,'Teacher'),
	(GETDATE(),GETDATE(),'lesson-01.jpg',1,'Lesson'),
	(GETDATE(),GETDATE(),'lesson-02.jpg',2,'Lesson'),
	(GETDATE(),GETDATE(),'lesson-03.jpg',3,'Lesson'),
	(GETDATE(),GETDATE(),'question-01.jpg',1,'Question'),
	(GETDATE(),GETDATE(),'question-02.jpg',2,'Question'),
	(GETDATE(),GETDATE(),'question-03.jpg',3,'Question'),
	(GETDATE(),GETDATE(),'paye-1.jpg',1,'License'),
	(GETDATE(),GETDATE(),'paye-2.jpg',2,'License'),
	(GETDATE(),GETDATE(),'paye-3.jpg',3,'License'),
	(GETDATE(),GETDATE(),'motorcycle.jpg',4,'License'),
	(GETDATE(),GETDATE(),'theory-course-01.jpg',1,'TheoryCourse'),
	(GETDATE(),GETDATE(),'theory-course-02.jpg',2,'TheoryCourse'),
	(GETDATE(),GETDATE(),'theory-course-03.jpg',3,'TheoryCourse'),
	(GETDATE(),GETDATE(),'news-01.jpg',1,'News'),
	(GETDATE(),GETDATE(),'news-02.jpg',2,'News'),
	(GETDATE(),GETDATE(),'news-03.jpg',3,'News'),
	(GETDATE(),GETDATE(),'news-04.jpg',4,'News');