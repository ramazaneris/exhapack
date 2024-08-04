const { execSync } = require("child_process");
const clcn = require("clcn");

const packInstaller = async (packs, options) => {
    let joinedPacks = packs.join(" ");

    try {
        execSync(`pnpm install ${joinedPacks}`, options);
        console.log(
            clcn.bgGreen(
                `Installed: ${joinedPacks
                    .split(" ")
                    .filter((pack) => pack !== "--save-dev")
                    .join(", ")}`
            )
        );
    } catch (error) {
        console.error(
            clcn.txtRed(`Command failed: "pnpm install ${joinedPacks}"`)
        );
        console.error(error.stderr);
        throw error;
    }
};

module.exports = {
    packInstaller,
};
