use DrivingTrainingCenter;

SET ANSI_NULLS ON 
GO
SET QUOTED_IDENTIFIER ON 
GO

-- ================================================
-- get applicants who payed by filter licnese type
-- ================================================
CREATE OR ALTER PROCEDURE spd_question 
	@type int
AS
BEGIN
	SET NOCOUNT ON;
	select * from applicants 
	join payments on payments.applicant_id = applicants.id
	join licenses on licenses.id = payments.license_id
	where payments.status = 'PAYED' AND licenses.name = @type
END
GO

-- ================================================
-- third store procedure
-- ================================================
CREATE OR ALTER PROCEDURE spd_baz 
	@id int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from applicants where id = @id;
END
GO

