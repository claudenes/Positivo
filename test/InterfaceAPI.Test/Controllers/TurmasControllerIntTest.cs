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
    public class TurmasControllerIntTest
    {
        public TurmasControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _turmasRepository = _factory.GetRequiredService<ITurmasRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private const string DefaultTurma = "AAAAAAAAAA";
        private const string UpdatedTurma = "BBBBBBBBBB";

        private const string DefaultTurno = "AAAAAAAAAA";
        private const string UpdatedTurno = "BBBBBBBBBB";

        private const string DefaultCurriculo = "AAAAAAAAAA";
        private const string UpdatedCurriculo = "BBBBBBBBBB";

        private static readonly int? DefaultSerie = 1;
        private static readonly int? UpdatedSerie = 2;

        private static readonly int? DefaultAno = 1;
        private static readonly int? UpdatedAno = 2;

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly ITurmasRepository _turmasRepository;

        private Turmas _turmas;

        private readonly IMapper _mapper;

        private Turmas CreateEntity()
        {
            return new Turmas
            {
                Turma = DefaultTurma,
                Turno = DefaultTurno,
                Curriculo = DefaultCurriculo,
                Serie = DefaultSerie,
                Ano = DefaultAno,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _turmas = CreateEntity();
        }

        [Fact]
        public async Task CreateTurmas()
        {
            var databaseSizeBeforeCreate = await _turmasRepository.CountAsync();

            // Create the Turmas
            TurmasDto _turmasDto = _mapper.Map<TurmasDto>(_turmas);
            var response = await _client.PostAsync("/api/turmas", TestUtil.ToJsonContent(_turmasDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the Turmas in the database
            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testTurmas = turmasList.Last();
            testTurmas.Turma.Should().Be(DefaultTurma);
            testTurmas.Turno.Should().Be(DefaultTurno);
            testTurmas.Curriculo.Should().Be(DefaultCurriculo);
            testTurmas.Serie.Should().Be(DefaultSerie);
            testTurmas.Ano.Should().Be(DefaultAno);
            testTurmas.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateTurmasWithExistingId()
        {
            var databaseSizeBeforeCreate = await _turmasRepository.CountAsync();
            // Create the Turmas with an existing ID
            _turmas.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            TurmasDto _turmasDto = _mapper.Map<TurmasDto>(_turmas);
            var response = await _client.PostAsync("/api/turmas", TestUtil.ToJsonContent(_turmasDto));

            // Validate the Turmas in the database
            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckTurmaIsRequired()
        {
            var databaseSizeBeforeTest = await _turmasRepository.CountAsync();

            // Set the field to null
            _turmas.Turma = null;

            // Create the Turmas, which fails.
            TurmasDto _turmasDto = _mapper.Map<TurmasDto>(_turmas);
            var response = await _client.PostAsync("/api/turmas", TestUtil.ToJsonContent(_turmasDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task CheckTurnoIsRequired()
        {
            var databaseSizeBeforeTest = await _turmasRepository.CountAsync();

            // Set the field to null
            _turmas.Turno = null;

            // Create the Turmas, which fails.
            TurmasDto _turmasDto = _mapper.Map<TurmasDto>(_turmas);
            var response = await _client.PostAsync("/api/turmas", TestUtil.ToJsonContent(_turmasDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task CheckCurriculoIsRequired()
        {
            var databaseSizeBeforeTest = await _turmasRepository.CountAsync();

            // Set the field to null
            _turmas.Curriculo = null;

            // Create the Turmas, which fails.
            TurmasDto _turmasDto = _mapper.Map<TurmasDto>(_turmas);
            var response = await _client.PostAsync("/api/turmas", TestUtil.ToJsonContent(_turmasDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllTurmas()
        {
            // Initialize the database
            await _turmasRepository.CreateOrUpdateAsync(_turmas);
            await _turmasRepository.SaveChangesAsync();

            // Get all the turmasList
            var response = await _client.GetAsync("/api/turmas?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_turmas.Id);
            json.SelectTokens("$.[*].turma").Should().Contain(DefaultTurma);
            json.SelectTokens("$.[*].turno").Should().Contain(DefaultTurno);
            json.SelectTokens("$.[*].curriculo").Should().Contain(DefaultCurriculo);
            json.SelectTokens("$.[*].serie").Should().Contain(DefaultSerie);
            json.SelectTokens("$.[*].ano").Should().Contain(DefaultAno);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetTurmas()
        {
            // Initialize the database
            await _turmasRepository.CreateOrUpdateAsync(_turmas);
            await _turmasRepository.SaveChangesAsync();

            // Get the turmas
            var response = await _client.GetAsync($"/api/turmas/{_turmas.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_turmas.Id);
            json.SelectTokens("$.turma").Should().Contain(DefaultTurma);
            json.SelectTokens("$.turno").Should().Contain(DefaultTurno);
            json.SelectTokens("$.curriculo").Should().Contain(DefaultCurriculo);
            json.SelectTokens("$.serie").Should().Contain(DefaultSerie);
            json.SelectTokens("$.ano").Should().Contain(DefaultAno);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingTurmas()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/turmas/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateTurmas()
        {
            // Initialize the database
            await _turmasRepository.CreateOrUpdateAsync(_turmas);
            await _turmasRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _turmasRepository.CountAsync();

            // Update the turmas
            var updatedTurmas = await _turmasRepository.QueryHelper().GetOneAsync(it => it.Id == _turmas.Id);
            // Disconnect from session so that the updates on updatedTurmas are not directly saved in db
            //TODO detach
            updatedTurmas.Turma = UpdatedTurma;
            updatedTurmas.Turno = UpdatedTurno;
            updatedTurmas.Curriculo = UpdatedCurriculo;
            updatedTurmas.Serie = UpdatedSerie;
            updatedTurmas.Ano = UpdatedAno;
            updatedTurmas.Dtatualizacao = UpdatedDtatualizacao;

            TurmasDto updatedTurmasDto = _mapper.Map<TurmasDto>(updatedTurmas);
            var response = await _client.PutAsync($"/api/turmas/{_turmas.Id}", TestUtil.ToJsonContent(updatedTurmasDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the Turmas in the database
            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testTurmas = turmasList.Last();
            testTurmas.Turma.Should().Be(UpdatedTurma);
            testTurmas.Turno.Should().Be(UpdatedTurno);
            testTurmas.Curriculo.Should().Be(UpdatedCurriculo);
            testTurmas.Serie.Should().Be(UpdatedSerie);
            testTurmas.Ano.Should().Be(UpdatedAno);
            testTurmas.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingTurmas()
        {
            var databaseSizeBeforeUpdate = await _turmasRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            TurmasDto _turmasDto = _mapper.Map<TurmasDto>(_turmas);
            var response = await _client.PutAsync("/api/turmas/1", TestUtil.ToJsonContent(_turmasDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Turmas in the database
            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteTurmas()
        {
            // Initialize the database
            await _turmasRepository.CreateOrUpdateAsync(_turmas);
            await _turmasRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _turmasRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/turmas/{_turmas.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var turmasList = await _turmasRepository.GetAllAsync();
            turmasList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(Turmas));
            var turmas1 = new Turmas
            {
                Id = 1L
            };
            var turmas2 = new Turmas
            {
                Id = turmas1.Id
            };
            turmas1.Should().Be(turmas2);
            turmas2.Id = 2L;
            turmas1.Should().NotBe(turmas2);
            turmas1.Id = 0;
            turmas1.Should().NotBe(turmas2);
        }
    }
}
