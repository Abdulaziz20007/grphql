import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
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

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const newCustomer = this.customerRepo.create(createCustomerInput);
    return await this.customerRepo.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerRepo.find({ 
        relations: ["orders"],
        order: { id: 'DESC' } 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch customers');
    }
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id }  ,relations :["orders"]});
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

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
    try {
      const customer = await this.findOne(id);
      await this.customerRepo.softRemove(customer);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove customer');
    }
  }
}
