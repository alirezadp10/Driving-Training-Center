use DrivingTrainingCenter;
GO

-- =============================================
-- Staffs Who write lessons after 2020-01-01
-- =============================================
CREATE OR ALTER VIEW [Staffs Who write lessons after 2020-01-01] AS
SELECT 
	staffs.id,
	staffs.national_code,
	CONCAT(staffs.first_name , ' ' , staffs.last_name) AS fullName
FROM staffs 
JOIN theory_courses on theory_courses.staff_id = staffs.id
JOIN lessons on lessons.theory_course_id = theory_courses.id
where lessons.created_at > '2020-01-01';
GO

-- =============================================
-- Teachers who have must applicants View
-- =============================================
CREATE OR ALTER VIEW [Teachers who have must applicants View] AS
SELECT 
	teachers.id,
	teachers.national_code,
	CONCAT(teachers.first_name , ' ' , teachers.last_name) AS fullName
FROM teachers Where id IN (SELECT TOP 1 teacher_id From practical_courses GROUP BY teacher_id)
GO



-- =============================================
-- Slider View
-- =============================================
CREATE OR ALTER VIEW [Slider View] AS
SELECT 
	news.id,
	news.title,
	CONCAT('/images/md/' , images.name) AS image
FROM news
JOIN func_images(N'News') AS images on images.imageable_id = news.id
GO

-- =============================================
-- Lessons View
-- =============================================
CREATE OR ALTER VIEW [Lessons List] AS
SELECT 
	lessons.id,
	lessons.title, 
	lessons.content, 
	staffs.id AS writer_id,
	CONCAT(staffs.first_name, ' ', staffs.last_name) AS writer_name,
	images.name AS image
FROM lessons
JOIN theory_courses on theory_courses.id = lessons.theory_course_id
JOIN func_images(N'LESSON') AS images on images.imageable_id = lessons.id
JOIN staffs on staffs.id = theory_courses.staff_id
GO

-- =============================================
-- Theory Courses View
-- =============================================
CREATE OR ALTER VIEW [TCourses List] AS
SELECT 
	theory_courses.id,
	theory_courses.license_type, 
	theory_courses.title, 
	staffs.id AS writer_id,
	CONCAT(staffs.first_name, ' ', staffs.last_name) AS writer_name,
	images.name AS image
FROM theory_courses
JOIN staffs on staffs.id = theory_courses.staff_id
JOIN func_images(N'TheoryCourse') AS images on images.imageable_id = theory_courses.id
GO

