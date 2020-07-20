use DrivingTrainingCenter;

SET ANSI_NULLS ON 
GO
SET QUOTED_IDENTIFIER ON 
GO

-- ================================================
-- first store procedure
-- ================================================
CREATE OR ALTER PROCEDURE spd_slider 
	@id int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		news.id,
		news.title,
		CONCAT('/images/md/' , images.name) AS image
	FROM news
	JOIN func_images(N'News') AS images on images.imageable_id = news.id
	where news.slide = 1
END
GO

-- ================================================
-- first store procedure
-- ================================================
CREATE OR ALTER PROCEDURE spd_foo 
	@id int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from applicants where id = @id;
END
GO

-- ================================================
-- secoend store procedure
-- ================================================
CREATE OR ALTER PROCEDURE spd_bar 
	@id int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from applicants where id = @id;
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

