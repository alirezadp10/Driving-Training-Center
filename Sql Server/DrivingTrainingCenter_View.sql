use DrivingTrainingCenter;
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

