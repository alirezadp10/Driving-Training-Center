USE DrivingTrainingCenter
--====================================
--  trigger
--====================================
GO
CREATE TRIGGER trg_schedule 
ON teachers 
AFTER INSERT
AS 
IF IS_MEMBER ('db_owner') = 0
BEGIN
DECLARE @id int;
BEGIN TRY  
BEGIN TRANSACTION;  
INSERT INTO schedules(day,[from],until,created_at,updated_at)
	VALUES(N'شنبه','10:30','12:20',GETDATE(),GETDATE());
COMMIT TRANSACTION;  
END TRY  
BEGIN CATCH  
	ROLLBACK;  
    EXECUTE usp_GetErrorInfo;  
END CATCH  
END
GO
