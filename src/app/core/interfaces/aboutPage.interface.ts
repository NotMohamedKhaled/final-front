export interface IBio {
    title: string;
    paragraph: string;
    imgUrl: string
}
export interface IEducation {
    school: String,
    degree: String,
    year: String,
    location: String,
    paragraph: String

}export interface ISkill {
    name: String,
    level: String, // Beginner, Intermediate, Advanced
    iconUrl: String
}

export interface IAboutPage {
    bio: IBio;
    education: IEducation[];
    skills: ISkill[];
}
