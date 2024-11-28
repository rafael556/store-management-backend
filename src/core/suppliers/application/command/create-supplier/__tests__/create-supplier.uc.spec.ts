import { ISupplierRepository } from "src/core/suppliers/domain/supplier.repository.interface";
import { CreateSupplierUseCase } from "../create-supplier.uc";
import { CreateSupplierCommand } from "../create-supplier.uc.dto";

describe('Create supplier unit test', () => {
    it('should create a supplier', async () => {
        // Arrange
        const supplierRepository: ISupplierRepository = {
            insert: jest.fn(),
            update: jest.fn(),
            exists: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            search: jest.fn(),
            sortableFields: [],
        }
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository);
        const supplier: CreateSupplierCommand = {
            name: 'Supplier Name',
            telephone: '123456789',
            socialMedia: 'socialMedia',
        }

        // Act
        const newSupplier = await createSupplierUseCase.execute(supplier);

        // Assert
        expect(supplierRepository.insert).toHaveBeenCalledTimes(1);
        expect(newSupplier).toBeDefined();
        expect(newSupplier.name).toBe(supplier.name);
        expect(newSupplier.telephone).toBe(supplier.telephone);
        expect(newSupplier.socialMedia).toBe(supplier.socialMedia);
        expect(newSupplier.isActive).toBe(true);
    })

    it('should throw error when saving supplier with existing name', async () => {
        // Arrange
        const supplierRepository: ISupplierRepository = {
            insert: jest.fn().mockRejectedValue(new Error('Error saving supplier')),
            update: jest.fn(),
            exists: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            search: jest.fn(),
            sortableFields: [],
        }
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository);
        const supplier: CreateSupplierCommand = {
            name: 'Supplier Name',
            telephone: '123456789',
            socialMedia: 'socialMedia',
        }

        // Act
        const createSupplier = createSupplierUseCase.execute(supplier);

        // Assert
        await expect(createSupplier).rejects.toThrow(new Error('Error saving supplier'));
    })
})