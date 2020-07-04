SET ANSI_NULLS ON 
GO
SET QUOTED_IDENTIFIER ON 
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

