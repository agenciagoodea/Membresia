import { LadderStage, Member, MemberOrigin } from '../types';

export const STAGE_ACTIVITIES: Record<LadderStage, string[]> = {
	[LadderStage.WIN]: ['Sistema de Oração', 'Evangelismo', 'Visita de Célula', 'Outra Igreja'],
	[LadderStage.CONSOLIDATE]: ['Batismo', 'Aclamado', 'Célula', 'Encontro com Deus'],
	[LadderStage.DISCIPLE]: ['Serviços Eclesiásticos', 'Escola de Líderes', 'Escola Bíblica do Reino', 'Cosmo Visões', 'Guerra Espiritual'],
	[LadderStage.SEND]: ['Multiplicação', 'Mentoria']
};

export const isStageComplete = (member: Member) => {
	if (member.stage === LadderStage.WIN) {
		const validOrigins = [MemberOrigin.PRAYER_REQUEST, MemberOrigin.EVANGELISM, MemberOrigin.CELL_VISIT, MemberOrigin.OTHER_CHURCH];
		return validOrigins.includes(member.origin as any);
	}

	const required = STAGE_ACTIVITIES[member.stage] || [];
	const completed = member.completedMilestones || [];

	if (member.stage === LadderStage.CONSOLIDATE) {
		const hasBaptismOrAcquired = completed.includes('Batismo') || completed.includes('Aclamado');
		const otherRequired = required.filter(act => act !== 'Batismo' && act !== 'Aclamado');

		return hasBaptismOrAcquired && otherRequired.every(activity => {
			if (activity === 'Célula' && member.cellId) return true;
			return completed.includes(activity);
		});
	}

	return required.every(activity => {
		if (activity === 'Célula' && member.cellId) return true;
		return completed.includes(activity);
	});
};

export const getMissingMilestones = (member: Member): string[] => {
	const required = STAGE_ACTIVITIES[member.stage] || [];
	const completed = member.completedMilestones || [];

	let missing = required.filter(activity => {
		if (activity === 'Célula' && member.cellId) return false;
		return !completed.includes(activity);
	});

	if (member.stage === LadderStage.CONSOLIDATE) {
		const hasOne = completed.includes('Batismo') || completed.includes('Aclamado');
		if (hasOne) {
			missing = missing.filter(m => m !== 'Batismo' && m !== 'Aclamado');
		}
	}

	return missing;
};
