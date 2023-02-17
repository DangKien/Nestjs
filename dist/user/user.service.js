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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const lodash_1 = require("lodash");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(user) {
        return await this.userRepository.save(user);
    }
    async findAll(query) {
        const { minAge = '', skip = 0, take = 0, name = null } = query;
        let obj = {};
        const nameObj = { name };
        const hehe = (0, lodash_1.merge)(obj, nameObj);
        if (minAge) {
            obj = { age: (0, typeorm_2.MoreThanOrEqual)(minAge) };
        }
        if (name) {
            obj = hehe;
            if (minAge) {
                obj = Object.assign({ age: (0, typeorm_2.MoreThanOrEqual)(minAge) }, hehe);
            }
        }
        if (take || skip) {
            obj = { take: take, skip: skip };
        }
        return await this.userRepository.find(obj);
    }
    async findOne(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }
    async update(id, user) {
        return await this.userRepository.update(id, user);
    }
    async remove(id) {
        const user = await this.userRepository.delete(id);
        if (!user.affected) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return await this.userRepository.delete(id);
    }
    async findByUserName(username) {
        const user = await this.userRepository.findOne({
            username,
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with username "${username}" not found`);
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map