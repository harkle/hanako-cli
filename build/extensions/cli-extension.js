"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = function (toolbox) {
    toolbox.updateAutoIncludes = function () { return __awaiter(void 0, void 0, void 0, function () {
        var print, filesystem, includes, paths, regex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    print = toolbox.print, filesystem = toolbox.filesystem;
                    includes = {
                        'scss': [],
                        'ts': []
                    };
                    paths = [
                        'views/twig/components/',
                        'views/twig/modules/',
                        'views/twig/pages/archives/',
                        'views/twig/pages/root/',
                        'views/twig/pages/singles/',
                        'views/twig/pages/templates/',
                        'views/twig/partials/',
                    ];
                    regex = /(export class )([A-Za-z]+)( extends)/;
                    paths.forEach(function (path) {
                        filesystem.subdirectories(path).forEach(function (componentFolder) {
                            if (filesystem.exists(componentFolder + '/index.scss'))
                                includes.scss.push({ path: componentFolder });
                            if (filesystem.exists(componentFolder + '/index.ts')) {
                                var fileContent = filesystem.read(componentFolder + '/index.ts', 'utf8');
                                var found = fileContent.match(regex);
                                var className = (found) ? found[2] : '';
                                console.log(className);
                                if (className)
                                    includes.ts.push({ path: componentFolder, className: className });
                            }
                        });
                    });
                    return [4 /*yield*/, toolbox.template.generate({
                            template: '_modules.ejs',
                            target: 'views/scss/_modules.scss',
                            props: { modules: includes.scss },
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, toolbox.template.generate({
                            template: 'site.ejs',
                            target: 'views/ts/site.ts',
                            props: { modules: includes.ts },
                        })];
                case 2:
                    _a.sent();
                    print.success("Auto-includes files updates");
                    return [2 /*return*/];
            }
        });
    }); };
    // enable this if you want to read configuration in from
    // the current folder's package.json (in a "hanako" property),
    // hanako.config.json, etc.
    // toolbox.config = {
    //   ...toolbox.config,
    //   ...toolbox.config.loadConfig("hanako", process.cwd())
    // }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leHRlbnNpb25zL2NsaS1leHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSwwRUFBMEU7QUFDMUUsbUJBQW1CO0FBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxPQUF1QjtJQUN2QyxPQUFPLENBQUMsa0JBQWtCLEdBQUc7Ozs7O29CQUNuQixLQUFLLEdBQWlCLE9BQU8sTUFBeEIsRUFBRSxVQUFVLEdBQUssT0FBTyxXQUFaLENBQVk7b0JBRWpDLFFBQVEsR0FBRzt3QkFDYixNQUFNLEVBQUUsRUFBRTt3QkFDVixJQUFJLEVBQUUsRUFBRTtxQkFDVCxDQUFBO29CQUVHLEtBQUssR0FBRzt3QkFDVix3QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIsNEJBQTRCO3dCQUM1Qix3QkFBd0I7d0JBQ3hCLDJCQUEyQjt3QkFDM0IsNkJBQTZCO3dCQUM3QixzQkFBc0I7cUJBQ3ZCLENBQUE7b0JBRUssS0FBSyxHQUFHLHNDQUFzQyxDQUFDO29CQUVyRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTt3QkFDakIsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxlQUFlOzRCQUN0RCxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQztnQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDOzRCQUV0RyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxFQUFFO2dDQUNwRCxJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQzNFLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ3ZDLElBQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dDQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUN2QixJQUFJLFNBQVM7b0NBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOzZCQUNsRjt3QkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxxQkFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQzs0QkFDOUIsUUFBUSxFQUFFLGNBQWM7NEJBQ3hCLE1BQU0sRUFBRSwwQkFBMEI7NEJBQ2xDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFO3lCQUNsQyxDQUFDLEVBQUE7O29CQUpGLFNBSUUsQ0FBQztvQkFFSCxxQkFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQzs0QkFDOUIsUUFBUSxFQUFFLFVBQVU7NEJBQ3BCLE1BQU0sRUFBRSxrQkFBa0I7NEJBQzFCLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO3lCQUNoQyxDQUFDLEVBQUE7O29CQUpGLFNBSUUsQ0FBQztvQkFFSCxLQUFLLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7Ozs7U0FDOUMsQ0FBQTtJQUVELHdEQUF3RDtJQUN4RCw4REFBOEQ7SUFDOUQsMkJBQTJCO0lBQzNCLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsMERBQTBEO0lBQzFELElBQUk7QUFDTixDQUFDLENBQUEifQ==