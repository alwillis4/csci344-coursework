// ignore this function for now. We'll go over it
// on Wednesday:
async function fetchCourses() {
  const url = `https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/2023/spring/`;
  courseList = await fetch(url).then((response) => response.json());
  displayResults(courseList);
}

function displayResults(courses) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous results

  courses.forEach((course) => {
    if (course.Department === "CSCI") {
      // Filter only CSCI courses
      const courseHTML = `
              <section class="course">
                  <h3>${course.Subject} ${course.CourseNumber}.${
        course.Section
      }: ${course.Title}</h3>
                  <ul>
                      <li>Instructor: ${course.Instructor}</li>
                      <li>Location: ${course.Location || "TBD"}</li>
                      <li>Days: ${course.Days || "TBD"}</li>
                  </ul>
              </section>
          `;
      resultsContainer.innerHTML += courseHTML; // Append course info
    }
  });
}
