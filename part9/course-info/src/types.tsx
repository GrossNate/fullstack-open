interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtendedBase extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartExtendedBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartExtendedBase {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartExtendedBase {
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;