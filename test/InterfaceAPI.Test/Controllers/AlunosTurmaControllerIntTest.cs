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
    public class AlunosTurmasControllerIntTest
    {
        public AlunosTurmasControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _alunosTurmaRepository = _factory.GetRequiredService<IAlunosTurmaRepository>();

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
        private readonly IAlunosTurmaRepository _alunosTurmaRepository;

        private AlunosTurma _alunosTurma;

        private readonly IMapper _mapper;

        private AlunosTurma CreateEntity()
        {
            return new AlunosTurma
            {
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _alunosTurma = CreateEntity();
        }

        [Fact]
        public async Task CreateAlunosTurma()
        {
            var databaseSizeBeforeCreate = await _alunosTurmaRepository.CountAsync();

            // Create the AlunosTurma
            AlunosTurmaDto _alunosTurmaDto = _mapper.Map<AlunosTurmaDto>(_alunosTurma);
            var response = await _client.PostAsync("/api/alunos-turmas", TestUtil.ToJsonContent(_alunosTurmaDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the AlunosTurma in the database
            var alunosTurmaList = await _alunosTurmaRepository.GetAllAsync();
            alunosTurmaList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testAlunosTurma = alunosTurmaList.Last();
            testAlunosTurma.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateAlunosTurmaWithExistingId()
        {
            var databaseSizeBeforeCreate = await _alunosTurmaRepository.CountAsync();
            // Create the AlunosTurma with an existing ID
            _alunosTurma.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            AlunosTurmaDto _alunosTurmaDto = _mapper.Map<AlunosTurmaDto>(_alunosTurma);
            var response = await _client.PostAsync("/api/alunos-turmas", TestUtil.ToJsonContent(_alunosTurmaDto));

            // Validate the AlunosTurma in the database
            var alunosTurmaList = await _alunosTurmaRepository.GetAllAsync();
            alunosTurmaList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task GetAllAlunosTurmas()
        {
            // Initialize the database
            await _alunosTurmaRepository.CreateOrUpdateAsync(_alunosTurma);
            await _alunosTurmaRepository.SaveChangesAsync();

            // Get all the alunosTurmaList
            var response = await _client.GetAsync("/api/alunos-turmas?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_alunosTurma.Id);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetAlunosTurma()
        {
            // Initialize the database
            await _alunosTurmaRepository.CreateOrUpdateAsync(_alunosTurma);
            await _alunosTurmaRepository.SaveChangesAsync();

            // Get the alunosTurma
            var response = await _client.GetAsync($"/api/alunos-turmas/{_alunosTurma.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_alunosTurma.Id);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingAlunosTurma()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/alunos-turmas/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateAlunosTurma()
        {
            // Initialize the database
            await _alunosTurmaRepository.CreateOrUpdateAsync(_alunosTurma);
            await _alunosTurmaRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _alunosTurmaRepository.CountAsync();

            // Update the alunosTurma
            var updatedAlunosTurma = await _alunosTurmaRepository.QueryHelper().GetOneAsync(it => it.Id == _alunosTurma.Id);
            // Disconnect from session so that the updates on updatedAlunosTurma are not directly saved in db
            //TODO detach
            updatedAlunosTurma.Dtatualizacao = UpdatedDtatualizacao;

            AlunosTurmaDto updatedAlunosTurmaDto = _mapper.Map<AlunosTurmaDto>(updatedAlunosTurma);
            var response = await _client.PutAsync($"/api/alunos-turmas/{_alunosTurma.Id}", TestUtil.ToJsonContent(updatedAlunosTurmaDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the AlunosTurma in the database
            var alunosTurmaList = await _alunosTurmaRepository.GetAllAsync();
            alunosTurmaList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testAlunosTurma = alunosTurmaList.Last();
            testAlunosTurma.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingAlunosTurma()
        {
            var databaseSizeBeforeUpdate = await _alunosTurmaRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            AlunosTurmaDto _alunosTurmaDto = _mapper.Map<AlunosTurmaDto>(_alunosTurma);
            var response = await _client.PutAsync("/api/alunos-turmas/1", TestUtil.ToJsonContent(_alunosTurmaDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the AlunosTurma in the database
            var alunosTurmaList = await _alunosTurmaRepository.GetAllAsync();
            alunosTurmaList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteAlunosTurma()
        {
            // Initialize the database
            await _alunosTurmaRepository.CreateOrUpdateAsync(_alunosTurma);
            await _alunosTurmaRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _alunosTurmaRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/alunos-turmas/{_alunosTurma.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var alunosTurmaList = await _alunosTurmaRepository.GetAllAsync();
            alunosTurmaList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(AlunosTurma));
            var alunosTurma1 = new AlunosTurma
            {
                Id = 1L
            };
            var alunosTurma2 = new AlunosTurma
            {
                Id = alunosTurma1.Id
            };
            alunosTurma1.Should().Be(alunosTurma2);
            alunosTurma2.Id = 2L;
            alunosTurma1.Should().NotBe(alunosTurma2);
            alunosTurma1.Id = 0;
            alunosTurma1.Should().NotBe(alunosTurma2);
        }
    }
}
