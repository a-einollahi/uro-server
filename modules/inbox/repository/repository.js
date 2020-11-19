const { Inbox, User, Person, Op } = require("../../../db/index");
  
module.exports = class Repository {
	
	constructor() {}

	// get
	async getNewMessages() {
		return Inbox.findAll({
			where: {status: null},
			include: [{
				model: User,
				required: true,
				include: [{
					model: Person,
					required: true
				}]
			}]
		});
	}

	async getReadedMessages() {
		return Inbox.findAll({
			where: {[Op.not]: [{ status: null }]},
			include: [{
				model: User,
				required: true,
				include: [{
					model: Person,
					required: true
				}]
			}]
		});
	}

	async getAllMessages(user_id) {
		return Inbox.findAll({where: {user_id}})
	}

	async getMessage(id) {
		return Inbox.findOne({where: {id}, raw: true})
	}

	// post
	async sendNewMessage(title, message, user_id) {
		return Inbox.create({
			title,
			message,
			user_id
		})
	}

	async updateRespone(id, status, response) {
		return Inbox.update({status, response}, {where: {id}});
	}

	async deleteMessage(id) {
		return Inbox.destroy({where: {id}});
	}

}