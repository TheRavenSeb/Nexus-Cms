const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('after-action-report')
    .setDescription('ahhhh'),
    host: true,
  async execute(interaction) {
    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('after-action-report')
      .setTitle('After Action Report');

    // Create individual text input fields, each in its own ActionRow
    const missionNameInput = new TextInputBuilder()
      .setCustomId('mission_name')
      .setLabel('Mission Name')
      .setStyle(TextInputStyle.Short);
    const missionNameRow = new ActionRowBuilder().addComponents(missionNameInput);

    const missionTypeInput = new TextInputBuilder()
      .setCustomId('mission_type')
      .setLabel('Mission Type')
      .setStyle(TextInputStyle.Short);
    const missionTypeRow = new ActionRowBuilder().addComponents(missionTypeInput);

    const missionDateInput = new TextInputBuilder()
      .setCustomId('mission_date')
      .setLabel('Mission Date')
      .setStyle(TextInputStyle.Short);
    const missionDateRow = new ActionRowBuilder().addComponents(missionDateInput);

    const missionParticipantsInput = new TextInputBuilder()
      .setCustomId('mission_participants')
      .setLabel('Mission Participants')
      .setStyle(TextInputStyle.Paragraph);
    const missionParticipantsRow = new ActionRowBuilder().addComponents(missionParticipantsInput);

    const missionNotesInput = new TextInputBuilder()
      .setCustomId('mission_notes')
      .setLabel('Mission Notes')
      .setStyle(TextInputStyle.Paragraph);
    const missionNotesRow = new ActionRowBuilder().addComponents(missionNotesInput);

    // Add the ActionRows to the modal
    modal.addComponents(
      missionNameRow,
      missionTypeRow,
      missionDateRow,
      missionParticipantsRow,
      missionNotesRow
    );

    // Show the modal
    await interaction.showModal(modal);
  }
};
