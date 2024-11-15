import { Supplier } from "src/core/suppliers/domain/supplier.aggregate";
import { CreateSupplierInputDto, CreateSupplierOutputDto } from "./create-suppliers.uc.dto";
import { Uuid } from "src/core/shared/domain/value-objects/uuid.vo";
import { ISupplierRepository } from "src/core/suppliers/domain/supplier.repository.interface";

export class CreateSupplierUseCase {
    constructor(private readonly supplierRepository: ISupplierRepository) {}

    async execute(input: CreateSupplierInputDto): Promise<CreateSupplierOutputDto> {
        const supplier = new Supplier({
            supplierId: new Uuid(),
            name: input.name,
            telephone: input.telephone,
            socialMedia: input.socialMedia,
            isActive: true,
        });
        
        await this.supplierRepository.saveSupplier(supplier);

        return {
            supplierId: supplier.entityId.id,
            name: supplier.name,
            telephone: supplier.telephone,
            socialMedia: supplier.socialMedia,
            isActive: supplier.isActive(),
        }
    }
}