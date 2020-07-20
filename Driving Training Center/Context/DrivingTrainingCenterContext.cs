using Driving_Training_Center;
using Microsoft.EntityFrameworkCore;

namespace DataLayer
{
    public class DrivingTrainingCenterContext : DbContext
    {
        public DrivingTrainingCenterContext(DbContextOptions<DrivingTrainingCenterContext> options) : base(options) { }
        public DbSet<Applicant> applicants { get; set; }
        public DbSet<ApplicantTheoryExam> applicant_theory_exams { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<CategoryNews> category_news { get; set; }
        public DbSet<Image> images { get; set; }
        public DbSet<Lesson> lessons { get; set; }
        public DbSet<License> licenses { get; set; }
        public DbSet<News> news { get; set; }
        public DbSet<Officer> officers { get; set; }
        public DbSet<Payment> payments { get; set; }
        public DbSet<PracticalCourse> practical_courses { get; set; }
        public DbSet<PracticalExam> practicalExams { get; set; }
        public DbSet<Question> questions { get; set; }
        public DbSet<Schedule> schedules { get; set; }
        public DbSet<SchedulePracticalCourse> schedule_practical_courses{ get; set; }
        public DbSet<ScheduleTeacher> schedule_teachers { get; set; }
        public DbSet<Session> sessions { get; set; }
        public DbSet<Staff> staffs { get; set; }
        public DbSet<Teacher> teachers { get; set; }
        public DbSet<TheoryCourse> theory_courses { get; set; }
        public DbSet<TheoryExam> theory_exams { get; set; }
        public DbSet<Vehicle> vehicles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<sliderView>().HasNoKey().ToView(null);

            modelBuilder.Entity<SchedulePracticalCourse>()
                .HasOne(x => x.Schedule)
                .WithMany(m => m.PracticalCourses)
                .HasForeignKey(x => x.schedule_id);

            modelBuilder.Entity<SchedulePracticalCourse>()
                .HasOne(x => x.PracticalCourse)
                .WithMany(m => m.Schedules)
                .HasForeignKey(x => x.practical_course_id);


            modelBuilder.Entity<ScheduleTeacher>()
                .HasOne(x => x.Schedule)
                .WithMany(m => m.Teachers)
                .HasForeignKey(x => x.schedule_id);

            modelBuilder.Entity<ScheduleTeacher>()
                .HasOne(x => x.Teacher)
                .WithMany(m => m.Schedules)
                .HasForeignKey(x => x.teacher_id);

            modelBuilder.Entity<Payment>()
                .HasOne(x => x.Applicant)
                .WithMany(m => m.Licenses)
                .HasForeignKey(x => x.applicant_id);

            modelBuilder.Entity<Payment>()
                .HasOne(x => x.License)
                .WithMany(m => m.Applicants)
                .HasForeignKey(x => x.license_id);

            modelBuilder.Entity<ApplicantTheoryExam>()
                .HasOne(x => x.Applicant)
                .WithMany(m => m.TheoryExams)
                .HasForeignKey(x => x.applicant_id);

            modelBuilder.Entity<ApplicantTheoryExam>()
                .HasOne(x => x.TheoryExam)
                .WithMany(m => m.Applicants)
                .HasForeignKey(x => x.theory_exam_id);

            modelBuilder.Entity<CategoryNews>()
                .HasOne(x => x.News)
                .WithMany(m => m.Categories)
                .HasForeignKey(x => x.news_id);

            modelBuilder.Entity<CategoryNews>()
                .HasOne(x => x.Category)
                .WithMany(m => m.News)
                .HasForeignKey(x => x.category_id);
        }
    }
}