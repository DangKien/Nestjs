"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./dto/user.dto");
const jwt_auth_guard_1 = require("../auth/login_auth/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(response, createUserDto) {
        const newUser = await this.userService.create(createUserDto);
        return response.status(common_1.HttpStatus.CREATED).json({
            newUser,
        });
    }
    async findAll(response, query) {
        const users = await this.userService.findAll(query);
        return response.status(common_1.HttpStatus.OK).json({
            users,
        });
    }
    async findOne(response, id) {
        const user = await this.userService.findOne(id);
        return response.status(common_1.HttpStatus.OK).json({
            user,
        });
    }
    async update(response, id, updateUser) {
        await this.userService.update(+id, updateUser);
        return response.status(common_1.HttpStatus.OK).json({
            id,
            updateUser,
        });
    }
    async remove(response, id) {
        const deleteUser = await this.userService.remove(+id);
        return response.status(common_1.HttpStatus.NO_CONTENT).json({
            deleteUser,
        });
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: 'Create User' }),
    (0, swagger_1.ApiBody)({ required: true, type: (0, swagger_1.OmitType)(user_dto_1.CreateUserDto, ['id']) }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request...' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Users' }),
    (0, swagger_1.ApiOkResponse)({ status: 200, type: user_entity_1.User, isArray: true }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found...' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.GetUserQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Find User by Id hehe' }),
    (0, swagger_1.ApiOkResponse)({ status: 200, type: user_entity_1.User }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update User by Id ' }),
    (0, swagger_1.ApiBody)({ required: true, type: (0, swagger_1.OmitType)(user_entity_1.User, ['id']) }),
    (0, swagger_1.ApiOkResponse)({ status: 200, type: user_entity_1.User }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Delete User' }),
    (0, swagger_1.ApiOkResponse)({ status: 204 }),
    openapi.ApiResponse({ status: 204, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map