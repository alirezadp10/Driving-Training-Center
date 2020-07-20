use DrivingTrainingCenter;
--------------------------------------------------
-- image function
--------------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER FUNCTION func_images 
(	
	@type nvarchar(MAX)
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT imageable_id,name from images WHERE imageable_type = @type
)
GO


--------------------------------------------------
-- image function
--------------------------------------------------
