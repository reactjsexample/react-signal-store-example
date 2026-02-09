type VariantType = "error" | "success" | "info" | "warning";

type MessageCardProps = {
    messageText?: string;
    variant: VariantType;
}

type VariantItem = {
    backgroundColor: string;
    color: string;
    text: string;
    title: string;
}

export function MessageCard({messageText, variant}: MessageCardProps) {
    const variantMap = new Map();
    let variantItem: VariantItem = {
        backgroundColor: "bg-[lightpink]",
        color: "red",
        text: "An error has occurred",
        title: "Error"
    };
    variantMap.set("error", variantItem);

    variantItem = {
        backgroundColor: "bg-[lightblue]",
        color: "blue",
        text: "Information",
        title: "Info",
    };
    variantMap.set("info", variantItem);

    variantItem = {
        backgroundColor: "bg-[lightgreen]",
        color: "green",
        text: "Success",
        title: "Success",
    };
    variantMap.set("success", variantItem);

    variantItem = {
        backgroundColor: "bg-[orange]",
        color: "gold",
        text: "Warning",
        title: "Warning",
    };
    variantMap.set("warning", variantItem);

    return (
        <div className="flex justify-center">
        <section className={`flex flex-col w-80 mt-8 items-center justify-between p-4
         ${variantMap.get(variant).backgroundColor}`}
        >
            <h3>{variantMap.get(variant).title}</h3>
            <div className="flex justify-between">
                {messageText || variantMap.get(variant).text}
            </div>
        </section>
        </div>
    )
}
