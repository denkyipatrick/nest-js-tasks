import { Repository, EntityRepository } from 'typeorm';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = getTaskFilterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE LOWER(:search) OR ' +
          'task.description LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
