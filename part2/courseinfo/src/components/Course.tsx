
interface Part {
  name: string;
  exercises: number;
  id: number;
}

interface Course {
  name: string;
  parts: Part[];
  id: number;
}

const Header = ({ name }: { name: string }) => {
  return (
    <h1>{name}</h1>
  )
};
const Part = ({ part }: { part: Part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
};

const Content = ({ parts }: Pick<Course, "parts">) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
};

const Total = ({ parts }: Pick<Course, "parts">) => {
  return (
    <p>
      Number of exercises {parts.reduce((accum, part) => accum + part.exercises, 0)}
    </p>

  )
};

const Course = ({ course }: { course: Course | Course[] }) => {
  if (!Array.isArray(course)) {
    course = [course];
  }
    return (
      <>
        {
          course.map(course => 
            <div key={course.id}>
              <Header name={course.name} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
            </div>
          )
        }
      </>
    )
}

export default Course