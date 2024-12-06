import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminant union member: ${JSON.stringify(value)}`);
}
const PartBasics = ({ coursePart }: { coursePart: CoursePart }) => (
  <>
    {coursePart.name} {coursePart.exerciseCount}
  </>
)

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <PartBasics coursePart={coursePart} /><br />
          Description: {coursePart.description}
        </p>
      );
    case "group":
      return (
        <p>
          <PartBasics coursePart={coursePart} /><br />
          Number of group projects: {coursePart.groupProjectCount}
        </p>
      )
    case "background":
      return (
        <p>
          <PartBasics coursePart={coursePart} /><br />
          Description: {coursePart.description}<br />
          Background: {coursePart.backgroundMaterial}
        </p>
      )
    case "special":
      return (
       <p>
          <PartBasics coursePart={coursePart} /><br />
          Requirements: {coursePart.requirements.join(", ")}
       </p> 
      )
    default:
      return assertNever(coursePart);
  }
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map(coursePart => (<Part coursePart={coursePart} key={coursePart.name}/>))}
  </>
)

export default Content