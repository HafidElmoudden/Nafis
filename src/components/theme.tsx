// export type Theme = {
//     [key: string]: string;
// };

// export interface Themes {
//     admin: Theme;
//     teacher: Theme;
//     moderator: Theme;
// }

export type UserType = keyof typeof sidebarTheme;
type ThemeComponents = {
    sidebar: (typeof sidebarTheme)[UserType];
    skillsPage: (typeof skillsPageTheme)[UserType];
    // Add the other themes here when u create one.
};
export type Theme = {
    [K in keyof ThemeComponents]: ThemeComponents[K];
};
export type Themes = {
    [K in UserType]: Theme;
};

function mergeThemes<T extends UserType>(userType: T): Theme {
    return {
        sidebar: sidebarTheme[userType],
        skillsPage: skillsPageTheme[userType],
        // Add the other themes here when u create one.
    };
}

const sidebarTheme = {
    admin: {
        sidebarBackground: "bg-yellow-600",
        sidebarTitle: "text-yellow-300",
        divider: "bg-yellow-500",
        emailText: "text-yellow-200",
        logoutIcon: "#FDE272",
        elementBackground: "bg-yellow-500",
        elementBackgroundHover: "hover:bg-yellow-700",
        dropdownElementsChevronIcon: "text-yellow-300",
        dropdownElementHover: "hover:bg-yellow-400",
    },
    moderator: {
        sidebarBackground: "bg-blue-600",
        sidebarTitle: "text-blue-300",
        divider: "bg-blue-500",
        emailText: "text-blue-200",
        logoutIcon: "#84CAFF",
        elementBackground: "bg-blue-500",
        elementBackgroundHover: "hover:bg-blue-400",
        dropdownElementsChevronIcon: "text-blue-300",
        dropdownElementHover: "hover:bg-blue-400",
    },
    get teacher() {
        return this.moderator;
    },
};

const skillsPageTheme = {
    admin: {
        createSkillButtonBg: "bg-yellow-600",
        createSkillButtonBgHover: "hover:bg-yellow-600/90",
    },
    moderator: {
        createSkillButtonBg: "bg-blue-600",
        createSkillButtonBgHover: "hover:bg-blue-600/90",
    },
    get teacher() {
        return this.moderator;
    },
};

export const themes: Themes = {
    admin: mergeThemes("admin"),
    teacher: mergeThemes("teacher"),
    moderator: mergeThemes("moderator"),
};
