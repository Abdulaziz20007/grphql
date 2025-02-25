import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCustomerInput } from "./dto/create-customer.input";
import { UpdateCustomerInput } from "./dto/update-customer.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) {}

  /** Create a new customer */
  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const newCustomer = this.customerRepo.create(createCustomerInput);
    return await this.customerRepo.save(newCustomer);
  }

  /** Get all customers */
  async findAll(): Promise<Customer[]> {
    return await this.customerRepo.find({ relations: ["orders"] });
  }

  /** Find a customer by ID */
  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id }  ,relations :["orders"]});
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  /** Update a customer */
  async update(
    id: number,
    updateCustomerInput: UpdateCustomerInput
  ): Promise<Customer> {
    const existingCustomer = await this.customerRepo.preload({
      id,
      ...updateCustomerInput,
    });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return await this.customerRepo.save(existingCustomer);
  }

  async remove(id: number): Promise<boolean> {
    const customer = await this.findOne(id); // Ensure it exists before deletion
    await this.customerRepo.softRemove(customer); // Soft delete (keeps record in DB)
    return true;
  }
}
