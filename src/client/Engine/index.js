// Custom dynamic load of classes dependencies
(() => {
    // Dependencies definitions
    const dependencies = {
        "GameEngine.js": ["Entities/GameObject.js", "Collisions/CollisionManager.js"],
        "Main.js": ["GameEngine.js", "Entities/Ball.js", "Entities/Block.js"],
        "Entities/Ball.js": ["Entities/GameObject.js"],
        "Entities/GameObject.js": ["Exceptions/ImplementationMissingException.js"],
        "Exceptions/ImplementationMissingException.js": [],
        "Entities/Block.js": ["Maths/Point.js", "Collisions/PolygonCollider.js", "Collisions/CollisionManager.js", "Entities/Polygon.js"],
        "Collisions/CollisionManager.js": [],
        "Collisions/PolygonCollider.js": ["Maths/Vector2d.js"],
        "Maths/Point.js": [],
        "Maths/Vector2d.js": ["Maths/Point.js"],
        "Entities/Polygon.js": ["Entities/GameObject.js", ]
    };
    const loadedDependencies = [];
    // Create html <script> tag
    const createScriptTag = (scriptPath) => {
        const element = document.createElement('script');
        element.setAttribute("type", "text/javascript");
        element.setAttribute("src", scriptPath);
        return element;
    };
    const scriptTags = [];
    //Depth-first dependency solver
    const resolveDependencies = (scriptPath, dependencyStack) => {
        if (loadedDependencies.includes(scriptPath)) {
            return;
        }
        if (dependencyStack.includes(scriptPath)) {
            throw new Error(`Looping dependencies: ${scriptPath} <= ${dependencyStack.join(' <= ')}`);
        }
        const subDependencies = dependencies[scriptPath];
        subDependencies.forEach(subDependency => {
            return resolveDependencies(subDependency, [scriptPath, ...dependencyStack]);
        })
        scriptTags.push(createScriptTag(scriptPath));
        loadedDependencies.push(scriptPath);
    };
    Object.keys(dependencies).forEach(file => {
        resolveDependencies(file, []);
    });
    const writeTag = (index) => {
        if (index >= scriptTags.length){
            return;
        }
        const tag = scriptTags[index];
        // Control scripts loading order
        tag.onload = () => {writeTag(index + 1);};
        document.getElementsByTagName('game')[0].appendChild(tag);
    };
    writeTag(0);
})();