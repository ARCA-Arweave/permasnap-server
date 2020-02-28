import { Entity, Column, PrimaryColumn, getConnection } from 'typeorm'


@Entity()
export default class ExampleEntity {
	@PrimaryColumn()
	UUID: string 

	@Column()
	Time: string = Date.now().toString()
}

export const createExampleEntity = async (): Promise<ExampleEntity> => {
	try {
		const connection = await getConnection()
		const ent = new ExampleEntity()
		await connection.manager.save(ent)
		return ent
	} catch (err) {
		console.error(err)
		throw err
	}
}
