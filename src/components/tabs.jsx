import React, { useEffect, useRef } from "react"
import { cn } from "utils"

export const Tab = ({ value, label, onClick = () => { }, active = false }) => {
    console.log(value, " tab is", active)
    return (
        <div onClick={onClick} className={cn("cursor-pointer border  border-t-0 border-r-0 border-l-0 w-auto px-2 py-2",
            active && "border-blue-600 border-b-2",
            !active && "border-none")}>
            <h1 className={cn("text-center", active && "text-blue-600 font-medium")}>{label}</h1>
        </div>
    )
}

export const TabsList = ({ children }) => {
    return (
        <div className="flex flex-row-reverse border border-b-[1px] border-t-0 border-r-0 border-l-0">
            {children}
        </div>
    )
}

export const TabContent = ({ value, children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export const Tabs = ({ children }) => {
    const [active, setActive] = React.useState(null);

    return (
        <div>
            {
                React.Children.toArray(children).map((child) => {
                    if (child.type.name === 'TabsList') {
                        return React.cloneElement(child, {
                            children: React.Children.map(child.props.children, (tab, index) => {
                                if (active === null && index == 0)
                                    setActive(tab.props.value)


                                return React.cloneElement(tab, {
                                    onClick: () => {
                                        setActive(tab.props.value);
                                    },
                                    active: tab.props.value === active,
                                });
                            }),
                        });
                    }

                    if (child.type.name === 'TabContent') {
                        return React.cloneElement(child, {
                            children: React.Children.toArray(child.props.children).filter((innerChild, index) => child.props.value === active),
                        });
                    }
                })}
        </div>
    )
}