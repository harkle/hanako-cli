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
module.exports = {
    name: 'add',
    alias: 'a',
    run: function (toolbox) {
        return __awaiter(this, void 0, void 0, function () {
            var updateAutoIncludes, print, prompt, filesystem, type, pageType, type_1, yesNo, askName, askSCSS, askTS, questions, _a, name, useSCSS, useTypeScript, pageTypeAdditionalS, filename, alreadyExisting, moduleName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updateAutoIncludes = toolbox.updateAutoIncludes, print = toolbox.print, prompt = toolbox.prompt, filesystem = toolbox.filesystem;
                        return [4 /*yield*/, prompt.ask({
                                type: 'select',
                                name: 'type',
                                message: 'Select a module type',
                                choices: ['Component', 'Module', 'Page', 'Partial']
                            })];
                    case 1:
                        type = (_b.sent()).type;
                        if (!(type === 'Page')) return [3 /*break*/, 3];
                        return [4 /*yield*/, prompt.ask({
                                type: 'select',
                                name: 'type',
                                message: 'Select a page type',
                                choices: ['Archive', 'Root', 'Single']
                            })];
                    case 2:
                        type_1 = (_b.sent()).type;
                        pageType = type_1;
                        _b.label = 3;
                    case 3:
                        yesNo = ['Yes', 'No'];
                        askName = { type: 'input', name: 'name', message: 'Enter a module name' };
                        askSCSS = {
                            type: 'select',
                            name: 'useSCSS',
                            message: 'Add scss',
                            choices: yesNo
                        };
                        askTS = {
                            type: 'select',
                            name: 'useTypeScript',
                            message: 'Add typescript',
                            choices: yesNo
                        };
                        questions = [askName, askSCSS, askTS];
                        return [4 /*yield*/, toolbox.prompt.ask(questions)];
                    case 4:
                        _a = _b.sent(), name = _a.name, useSCSS = _a.useSCSS, useTypeScript = _a.useTypeScript;
                        pageTypeAdditionalS = (pageType !== 'root') ? 's' : '';
                        filename = ('views/twig/' + type + 's/' + ((pageType) ? pageType + pageTypeAdditionalS + '/' : '') + name).toLowerCase();
                        return [4 /*yield*/, filesystem.exists(filename)];
                    case 5:
                        alreadyExisting = _b.sent();
                        if (!!alreadyExisting) return [3 /*break*/, 11];
                        filesystem.dir(filename);
                        return [4 /*yield*/, toolbox.template.generate({
                                template: 'twig.ejs',
                                target: filename + '/index.twig',
                                props: { name: name },
                            })];
                    case 6:
                        _b.sent();
                        if (!useSCSS) return [3 /*break*/, 8];
                        return [4 /*yield*/, toolbox.template.generate({
                                template: 'scss.ejs',
                                target: filename + '/index.scss',
                                props: { name: name },
                            })];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        if (!useTypeScript) return [3 /*break*/, 10];
                        moduleName = name.charAt(0).toUpperCase() + name.slice(1);
                        return [4 /*yield*/, toolbox.template.generate({
                                template: 'ts.ejs',
                                target: filename + '/index.ts',
                                props: { moduleName: moduleName },
                            })];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        print.success("Module " + name + " successfuly added");
                        updateAutoIncludes();
                        return [3 /*break*/, 12];
                    case 11:
                        print.error("This module already exist " + filename);
                        _b.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FkZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsSUFBSSxFQUFFLEtBQUs7SUFDWCxLQUFLLEVBQUUsR0FBRztJQUNWLEdBQUcsRUFBRSxVQUFlLE9BQU87Ozs7Ozt3QkFDakIsa0JBQWtCLEdBQWdDLE9BQU8sbUJBQXZDLEVBQUUsS0FBSyxHQUF5QixPQUFPLE1BQWhDLEVBQUUsTUFBTSxHQUFpQixPQUFPLE9BQXhCLEVBQUUsVUFBVSxHQUFLLE9BQU8sV0FBWixDQUFZO3dCQUdoRCxxQkFBTSxNQUFNLENBQUMsR0FBRyxDQUFDO2dDQUNoQyxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxJQUFJLEVBQUUsTUFBTTtnQ0FDWixPQUFPLEVBQUUsc0JBQXNCO2dDQUMvQixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUM7NkJBQ3BELENBQUMsRUFBQTs7d0JBTE0sSUFBSSxHQUFLLENBQUEsU0FLZixDQUFBLEtBTFU7NkJBUVIsQ0FBQSxJQUFJLEtBQUssTUFBTSxDQUFBLEVBQWYsd0JBQWU7d0JBQ0EscUJBQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQztnQ0FDaEMsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsSUFBSSxFQUFFLE1BQU07Z0NBQ1osT0FBTyxFQUFFLG9CQUFvQjtnQ0FDN0IsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7NkJBQ3ZDLENBQUMsRUFBQTs7d0JBTE0sU0FBUyxDQUFBLFNBS2YsQ0FBQSxLQUxVO3dCQU9aLFFBQVEsR0FBRyxNQUFJLENBQUM7Ozt3QkFHWixLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBRXRCLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsQ0FBQTt3QkFFekUsT0FBTyxHQUFHOzRCQUNkLElBQUksRUFBRSxRQUFROzRCQUNkLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxVQUFVOzRCQUNuQixPQUFPLEVBQUUsS0FBSzt5QkFDZixDQUFBO3dCQUVLLEtBQUssR0FBRzs0QkFDWixJQUFJLEVBQUUsUUFBUTs0QkFDZCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsT0FBTyxFQUFFLGdCQUFnQjs0QkFDekIsT0FBTyxFQUFFLEtBQUs7eUJBQ2YsQ0FBQTt3QkFFSyxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO3dCQUNGLHFCQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFBdEUsS0FBbUMsU0FBbUMsRUFBcEUsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsYUFBYSxtQkFBQTt3QkFFOUIsbUJBQW1CLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUN2RCxRQUFRLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUd2RyxxQkFBTSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBbkQsZUFBZSxHQUFHLFNBQWlDOzZCQUNyRCxDQUFDLGVBQWUsRUFBaEIseUJBQWdCO3dCQUNsQixVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUV6QixxQkFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQ0FDOUIsUUFBUSxFQUFFLFVBQVU7Z0NBQ3BCLE1BQU0sRUFBRSxRQUFRLEdBQUcsYUFBYTtnQ0FDaEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUU7NkJBQ2hCLENBQUMsRUFBQTs7d0JBSkYsU0FJRSxDQUFDOzZCQUVDLE9BQU8sRUFBUCx3QkFBTzt3QkFDVCxxQkFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQ0FDOUIsUUFBUSxFQUFFLFVBQVU7Z0NBQ3BCLE1BQU0sRUFBRSxRQUFRLEdBQUcsYUFBYTtnQ0FDaEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUU7NkJBQ2hCLENBQUMsRUFBQTs7d0JBSkYsU0FJRSxDQUFDOzs7NkJBR0QsYUFBYSxFQUFiLHlCQUFhO3dCQUNULFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRWhFLHFCQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dDQUM5QixRQUFRLEVBQUUsUUFBUTtnQ0FDbEIsTUFBTSxFQUFFLFFBQVEsR0FBRyxXQUFXO2dDQUM5QixLQUFLLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRTs2QkFDdEIsQ0FBQyxFQUFBOzt3QkFKRixTQUlFLENBQUM7Ozt3QkFHTCxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVUsSUFBSSx1QkFBb0IsQ0FBQyxDQUFDO3dCQUVsRCxrQkFBa0IsRUFBRSxDQUFDOzs7d0JBRXJCLEtBQUssQ0FBQyxLQUFLLENBQUMsK0JBQTZCLFFBQVUsQ0FBQyxDQUFDOzs7Ozs7S0FFeEQ7Q0FDRixDQUFBIn0=