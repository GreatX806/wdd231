const coursesContainer =
    document.querySelector("#courses-container");

const totalCredits =
    document.querySelector("#total-credits");


function displayCourses(courseList) {

    coursesContainer.innerHTML = "";


    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");


        if (course.completed) {
            card.classList.add("completed");
        }


        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>

            <p>${course.title}</p>

            <p>${course.credits} Credits</p>

            ${
                course.completed
                    ? "<strong>✓ Completed</strong>"
                    : ""
            }
        `;


        coursesContainer.appendChild(card);

    });


    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );


    totalCredits.textContent = credits;
}


/* ALL */

document
    .querySelector("#all-courses")
    .addEventListener("click", () => {

        displayCourses(courses);

    });


/* CSE */

document
    .querySelector("#cse-courses")
    .addEventListener("click", () => {

        const filteredCourses = courses.filter(
            course => course.subject === "CSE"
        );

        displayCourses(filteredCourses);

    });


/* WDD */

document
    .querySelector("#wdd-courses")
    .addEventListener("click", () => {

        const filteredCourses = courses.filter(
            course => course.subject === "WDD"
        );

        displayCourses(filteredCourses);

    });


/* Initial display */

displayCourses(courses);