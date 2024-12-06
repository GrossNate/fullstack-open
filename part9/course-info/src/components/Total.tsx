import { CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <p>Number of exercises: {courseParts.reduce((total: number, { exerciseCount }) => total + exerciseCount, 0)}</p>
)

export default Total