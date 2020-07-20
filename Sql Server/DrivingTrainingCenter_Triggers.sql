USE DrivingTrainingCenter
--====================================
-- foo trigger
--====================================
GO

CREATE TRIGGER trg_foo 
ON applicants 
AFTER INSERT, DELETE
AS 
IF IS_MEMBER ('db_owner') = 0
BEGIN
   PRINT 'You must ask your DBA to drop or alter tables!' 
   SET NOCOUNT ON;
   ROLLBACK TRANSACTION
END
GO
