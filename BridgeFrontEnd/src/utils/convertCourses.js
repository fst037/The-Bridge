const daysOfWeek = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];

export const convertCourses = (courses) => {
  return courses.map((course) => {
    const [year, shift, ...rest] = course.name.split(" - ");
    const dayIndex = rest.findIndex((item) => daysOfWeek.includes(item));
    const day = rest[dayIndex];
    const subjectArray = rest.slice(dayIndex + 1);
    const subject = subjectArray.join(" ");

    return {
      code: course.code,
      year,
      shift,
      day,
      subject,
    };
  });
};
