using System;

using AutoMapper;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Positivo.InterfaceAPI.Infrastructure.Data;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Configuration.AutoMapper;
using Positivo.InterfaceAPI.Test.Setup;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Xunit;

namespace Positivo.InterfaceAPI.Test.Controllers
{
    public class ProfessoresTurmasControllerIntTest
    {
        public ProfessoresTurmasControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _professoresTurmaRepository = _factory.GetRequiredService<IProfessoresTurmaRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IProfessoresTurmaRepository _professoresTurmaRepository;

        private ProfessoresTurma _professoresTurma;

        private readonly IMapper _mapper;

        private ProfessoresTurma CreateEntity()
        {
            return new ProfessoresTurma
            {
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _professoresTurma = CreateEntity();
        }

        [Fact]
        public async Task CreateProfessoresTurma()
        {
            var databaseSizeBeforeCreate = await _professoresTurmaRepository.CountAsync();

            // Create the ProfessoresTurma
            ProfessoresTurmaDto _professoresTurmaDto = _mapper.Map<ProfessoresTurmaDto>(_professoresTurma);
            var response = await _client.PostAsync("/api/professores-turmas", TestUtil.ToJsonContent(_professoresTurmaDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the ProfessoresTurma in the database
            var professoresTurmaList = await _professoresTurmaRepository.GetAllAsync();
            professoresTurmaList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testProfessoresTurma = professoresTurmaList.Last();
            testProfessoresTurma.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateProfessoresTurmaWithExistingId()
        {
            var databaseSizeBeforeCreate = await _professoresTurmaRepository.CountAsync();
            // Create the ProfessoresTurma with an existing ID
            _professoresTurma.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            ProfessoresTurmaDto _professoresTurmaDto = _mapper.Map<ProfessoresTurmaDto>(_professoresTurma);
            var response = await _client.PostAsync("/api/professores-turmas", TestUtil.ToJsonContent(_professoresTurmaDto));

            // Validate the ProfessoresTurma in the database
            var professoresTurmaList = await _professoresTurmaRepository.GetAllAsync();
            professoresTurmaList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task GetAllProfessoresTurmas()
        {
            // Initialize the database
            await _professoresTurmaRepository.CreateOrUpdateAsync(_professoresTurma);
            await _professoresTurmaRepository.SaveChangesAsync();

            // Get all the professoresTurmaList
            var response = await _client.GetAsync("/api/professores-turmas?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_professoresTurma.Id);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetProfessoresTurma()
        {
            // Initialize the database
            await _professoresTurmaRepository.CreateOrUpdateAsync(_professoresTurma);
            await _professoresTurmaRepository.SaveChangesAsync();

            // Get the professoresTurma
            var response = await _client.GetAsync($"/api/professores-turmas/{_professoresTurma.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_professoresTurma.Id);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingProfessoresTurma()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/professores-turmas/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateProfessoresTurma()
        {
            // Initialize the database
            await _professoresTurmaRepository.CreateOrUpdateAsync(_professoresTurma);
            await _professoresTurmaRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _professoresTurmaRepository.CountAsync();

            // Update the professoresTurma
            var updatedProfessoresTurma = await _professoresTurmaRepository.QueryHelper().GetOneAsync(it => it.Id == _professoresTurma.Id);
            // Disconnect from session so that the updates on updatedProfessoresTurma are not directly saved in db
            //TODO detach
            updatedProfessoresTurma.Dtatualizacao = UpdatedDtatualizacao;

            ProfessoresTurmaDto updatedProfessoresTurmaDto = _mapper.Map<ProfessoresTurmaDto>(updatedProfessoresTurma);
            var response = await _client.PutAsync($"/api/professores-turmas/{_professoresTurma.Id}", TestUtil.ToJsonContent(updatedProfessoresTurmaDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the ProfessoresTurma in the database
            var professoresTurmaList = await _professoresTurmaRepository.GetAllAsync();
            professoresTurmaList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testProfessoresTurma = professoresTurmaList.Last();
            testProfessoresTurma.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingProfessoresTurma()
        {
            var databaseSizeBeforeUpdate = await _professoresTurmaRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            ProfessoresTurmaDto _professoresTurmaDto = _mapper.Map<ProfessoresTurmaDto>(_professoresTurma);
            var response = await _client.PutAsync("/api/professores-turmas/1", TestUtil.ToJsonContent(_professoresTurmaDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the ProfessoresTurma in the database
            var professoresTurmaList = await _professoresTurmaRepository.GetAllAsync();
            professoresTurmaList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteProfessoresTurma()
        {
            // Initialize the database
            await _professoresTurmaRepository.CreateOrUpdateAsync(_professoresTurma);
            await _professoresTurmaRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _professoresTurmaRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/professores-turmas/{_professoresTurma.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var professoresTurmaList = await _professoresTurmaRepository.GetAllAsync();
            professoresTurmaList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(ProfessoresTurma));
            var professoresTurma1 = new ProfessoresTurma
            {
                Id = 1L
            };
            var professoresTurma2 = new ProfessoresTurma
            {
                Id = professoresTurma1.Id
            };
            professoresTurma1.Should().Be(professoresTurma2);
            professoresTurma2.Id = 2L;
            professoresTurma1.Should().NotBe(professoresTurma2);
            professoresTurma1.Id = 0;
            professoresTurma1.Should().NotBe(professoresTurma2);
        }
    }
}
