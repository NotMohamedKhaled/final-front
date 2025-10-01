export interface IBio {
    title: string;
    paragraph: string;
    imgUrl: string
}
export interface IEducation {
    _id:string
    school: string,
    degree: string,
    year: string,
    location: string,
    paragraph: string

}export interface ISkill {
    name: string,
    level: string, // Beginner, Intermediate, Advanced
    iconUrl: string
    _id:string

}

export interface IAboutPage {
    bio: IBio;
    education: IEducation[];
    skills: ISkill[];
}
