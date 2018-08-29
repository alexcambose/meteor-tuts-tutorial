const PostTypesEnum = {
    NATURE: 'nature',
    PSYCHOLOGY: 'psychology',
    MUSIC: 'music',
    PROGRAMMING: 'programming',
    PROJECT_MANAGEMENT: 'project-management',
    OTHER: 'other'
};
// maybe you want to have them used as human readable
const PostTypesLabels = {
    [PostTypesEnum.NATURE]: 'Nature',
    [PostTypesEnum.PSYCHOLOGY]: 'Psychology',
    [PostTypesEnum.MUSIC]: 'Music',
    [PostTypesEnum.PROGRAMMING]: 'Programming',
    [PostTypesEnum.PROJECT_MANAGEMENT]: 'Project Management',
    [PostTypesEnum.OTHER]: 'Other',
};
export default PostTypesEnum;

export {
    PostTypesEnum,
    PostTypesLabels,
}